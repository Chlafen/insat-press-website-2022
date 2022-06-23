import axios from 'axios';

export function apiPost(url, params={}){
    const user = localStorage.getItem('user');
  
    let headers;
    if(user){
      headers = {
        "x-access-token": JSON.parse(user).accessToken,
        'Content-Type': 'application/json'
      }
    }
    else {
      headers = {'Content-Type': 'application/json'};
    }
    return axios.post(
      url,
      params,
      {
        headers:headers
      }
    );
  }
  
  export function apiGet(url, params={}){
    const user = localStorage.getItem('user');
  
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if(user){
      headers['x-access-token'] = JSON.parse(user).accessToken;
    }
    return new Promise((resolve, reject)=>{
      axios.get(
        url,
        {
          params: params,
          headers:headers
        }
      ).catch(async (err)=>{
        if(err.response.status === 403){
          if(err.response.data.error === "Invalid access token!"){
            localStorage.removeItem('user');
            await apiGet(url, params).then((res)=>{
              resolve(res);
            }).catch((err)=>{
              reject(err);
            })
          }
        }
        reject(err);
      }).then((res)=>{
        resolve(res);
      })
    })
  }
  
  export function getUserInfo(){
    return apiGet('/api/users/userinfo')
      .then((resp)=>{
        if(resp.status === 200){
          return resp.data.data;
        }
        return null;
      })
      .catch((err)=>{
        console.log("getUserInfo err") 
        console.log(err.response)
        return null;
      })
  }