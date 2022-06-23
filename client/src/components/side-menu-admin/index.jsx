import React, { useContext, useEffect, useState } from 'react'
import { getUserInfo } from '../../util/apiUtilities';
import SideMenuButton from '../side-menu-button';
import './style.css'

const test_user = { 
  user_id: 1, 
  username: "insatpress", 
  email: "insat.press@gmail.com", 
  first_name: "Mohamed", 
  last_name: "Mongi", 
  profile_pic: "/users/default_user1.png", 
  user_type: {
    type_id: 1,
    title: "Administrator"
  } 
}

export default function SideMenuPanel({items, user, selectedIndex}) {
  return (
    <div className='side-menu-container'>
      <div className="menu-user-info">
        <div className="menu-user-pic">
          <img src={"http://localhost:3001"+test_user.profile_pic} alt="author-img"/>
        </div>
        <div className="menu-user-name">
          <div className="menu-user-name-first">{test_user.first_name}</div>
          <div className="menu-user-name-last">{test_user.last_name}</div>
        </div>
      </div>
      <div>
        {
          items.map((value, ind)=>{
            return <SideMenuButton 
              onChange={()=>{
                window.location.href = value.redirection;
              }}
              data={value}
              key={ind}
              selected={selectedIndex === ind}
            />;
          })
        }
      </div>
      <div className="return-to-site">
        <SideMenuButton
          onChange={()=>{
            window.location.href = '/';
          }}
          selected={false}
          data={{
            title: "Back to site",
            icon: <img src='/images/logo.png' />
          }}
        />
      </div>
    </div>
  );
}