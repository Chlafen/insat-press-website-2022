import axios from 'axios';

export async function apiPost(url, params={}, contentType='') {
    const user = localStorage.getItem('user');
  
    let headers;
    if(user){
      headers = {
        "x-access-token": JSON.parse(user).accessToken,
        'Content-Type': contentType || 'application/json'
      }
    }
    else {
      headers = {'Content-Type': contentType || 'application/json'};
    }
    return axios.post(
      url,
      params,
      {
        headers:headers
      }
    );
  }
  
  export async function apiGet(url, params={}){
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
  
  export async function getUserInfo(){
    return apiGet('/api/users/userinfo')
      .then((resp)=>{
        if(resp.status === 200){
          return resp.data.data;
        }
        return null;
      })
      .catch((err)=>{
        console.log("user info error,", err);
        console.log(err.response);
        localStorage.removeItem('user');
        return null;
      })
  }

  /**
   * 
   * @param {*} limit [if not specified then 10]
   * @param {*} teamType [if not specified then all types]
   * @returns {*} [returns array of top $limit users based on post count]
   */
  export async function getTopTeam(limit=10, teamType=-1){
    return apiGet('/api/users/team', {limit: limit, type: teamType})
      .then((resp)=>{
        if(resp.status === 200){
          return resp.data.data;
        }
        return null;
      })
      .catch((err)=>{
        console.log("top team error,", err);
        console.log(err.response);
        return null;
      })
  }

  /**
   * 
   * @description [returns public user info for a given user id]
  */
  export async function getOneUser(id){
    return apiGet('/api/users/'+id)
      .then((resp)=>{
        if(resp.status === 200){
          return resp.data.data;
        }
        return null;
      })
      .catch((err)=>{
        console.log("user info error,", err);
        console.log(err.response);
        return null;
      })
  }