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
  
    let headers;
    if(user){
      headers = {
        "x-access-token": JSON.parse(user).accessToken, 'Content-Type': 'application/json'
      }
    }
    else {
      headers = {'Content-Type': 'application/json'};
    }
    return axios.get(
      url,
      {
        params: params,
        headers:headers
      }
    );
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
        console.log(err.response)
        return null;
      })
  }