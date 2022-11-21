import React, { useContext, useEffect, useState } from 'react'
import AdminPanelDisplay from '../../components/admin-panel-display';
import SideMenuPanel from '../../components/side-menu-admin';
import { AuthContext } from '../../context/authContext';
import { getUserInfo } from '../../util/apiUtilities';
import './style.css';

const menu_items = [
  {
    title: "Dashboard",
    icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>,
    redirection: "/admin",
    indexes: [0]
  },
  {
    title: "Users",
    icon: <>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    </>,
    redirection: "/admin/users",
    indexes: [1, 5, 6]
  },
  {
    title: "Posts",
    icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>,
    redirection: "/admin/posts",
    indexes: [2]
  },
  {
    title: "Comments",
    icon: <>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
      </svg>
    </>,
    redirection: "/admin/comments",
    indexes: [3]
  },
  {
    title: "Logs",
    icon: <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>,
    redirection: "/admin/logs",
    indexes: [4]
  },
  {
    title: "Site Settings",
    icon: <>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </>,
    redirection: "/admin/settings",
    indexes: [5]
  }
]

export default function AdminPanel({pageIndex}) {
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
    getUserInfo()
      .then((info)=>{
        console.log("user info admin");
        console.log(info);
        if(info !== userInfo) setUserInfo(info);
        if(info == null || info.user_type.type_id !== 1){
          console.log("not allowed")
          window.location.href = '/';
          return;
        }
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