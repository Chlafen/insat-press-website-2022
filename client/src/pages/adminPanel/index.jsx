import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { getUserInfo } from '../../util/apiUtilities';

export default function AdminPanel() {
  const [userInfo, setUserInfo] = useState(null);
  const auth = useContext(AuthContext);

  // Verify user role
  // null if not logged in
  useEffect(()=>{

    getUserInfo().then((info)=>{
      if(!info){
        //not logged in
        window.location.href = '/login';
        return;
      }
      if(info.user_type.type_id !== 1){
        //not admin
        console.log("unauthorized")
        window.location.href = '/';
        return;
      }
      setUserInfo(info);
    })
  }, []);

  return userInfo?(
    <div>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
    </div>
  ):null;
}