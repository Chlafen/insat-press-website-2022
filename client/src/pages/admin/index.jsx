import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { getUserInfo } from '../../util/apiUtilities';

export default function AdminPanel() {
  const [userInfo, setUserInfo] = useState(null);
  const auth = useContext(AuthContext);

  // Verify user role
  // null if not logged in
  useEffect(()=>{
    if(!auth.currentUser()){
      console.log("not logged in")
      window.location.href = '/';
      return;
    }

    getUserInfo().then((info)=>{
      console.log("user info");
      console.log(info);
      setUserInfo(info);
      if(info.user_type.type_id !== 1){
        console.log("not allowed")
        window.location.href = '/';
        return;
      }
    })
  }, []);

  return (
    <>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
      This is admin panel<br/>
    </>
  );
}