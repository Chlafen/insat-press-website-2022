import React, { createRef, useEffect, useState } from "react";
import { apiGet } from "../../../util/apiUtilities";
import LineNavigator from "../line-navigator";
import './style.css';

const users_test = [
  {
    "user_id": 1, 
    "username": "insatpress", 
    "first_name": "insatpress", 
    "last_name": "", 
    "email": "insat.press@gmail.com", 
    "join_date": "2017-06-14 20:01:02", 
    "profile_pic": "/users/default_user1.png", 
    user_type: { type_id: 1 },
    "is_verified": 0
  },
  {
    "user_id": 2, 
    "username": "M0ngi", 
    "first_name": "Mohamed Mongi", 
    "last_name": "Saidane", 
    "email": "saidanemongi@gmail.com", 
    "join_date": "2017-06-14 20:01:02", 
    "profile_pic": "/users/default_user1.png", 
    user_type: { type_id: 2 },
    "is_verified": 0
  },
  {
    "user_id": 3, 
    "username": "Chlafen", 
    "first_name": "Mohamed Amine", 
    "last_name": "Bouchnak", 
    "email": "chlafen.bafen@gmail.com", 
    "join_date": "2017-06-14 20:01:02", 
    "profile_pic": "/users/default_user1.png", 
    user_type: { type_id: 2 },
    "is_verified": 0
  }
]

const roles = {
  1: "Administrator",
  2: "Editor",
  3: "User"
}

export default function AdminPanelUserDisplay({}) {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState(-1);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchFilterOption, setSearchFilterOption] = useState("name");

  const AddUserButtonClick = ()=>{
    window.location.href = "/admin/users/new";
  }

  const isDisplayed = (user)=>{
    if(user.user_type.type_id != filterRole && filterRole != -1) return false;
    if(searchFilter != ""){
      switch(searchFilterOption){
        case "name": {
          if((user.first_name +" "+user.last_name ).toUpperCase().search(searchFilter.toUpperCase()) == -1) return false
          break;
        }
        case "email":{
          if(user.email.toUpperCase().search(searchFilter.toUpperCase()) == -1) return false;
          break;
        }
        case "id":{
          if(user.user_id != searchFilter) return false;
          break;
        }
      }
    }
    
    return true;
  }

  const roleFilterChange = (new_value) =>{
    setFilterRole(new_value.target.value)
  }

  const filterOptionChange = (new_value) =>{
    setSearchFilterOption(new_value.target.value)
  }

  const filterTextChange = (target)=>{
    setSearchFilter(target.target.value);
  }

  useEffect(()=>{
    apiGet('/api/admin/users')
      .then((data)=>{
        console.log(data);
        setUsers(data.data.data)
      })
      .catch((err)=>{
        console.log("get users err");
        console.log(err);
      })
    
    document.body.addEventListener("click", (event)=>{
      if(event.target.classList.contains("no-close-effect")) return;

      let visible = document.querySelector(".user-list-manage-dropdown-visible");
      if(visible) visible.classList.remove("user-list-manage-dropdown-visible")
    })
  }, [])

  return (
    <div className="admin-panel-content-display">
      <LineNavigator 
        sections={[
          {
            title: "INSAT Press",
            redirection: "/"
          },
          {
            title: "Admin Dashboard",
            redirection: "/admin"
          },
          {
            title: "Users",
            redirection: "/admin/users"
          }
        ]}
      />
      <div className="admin-panel-row admin-panel-top-margin admin-panel-sides-padding">
        <div className="admin-panel-section-title">
          Users
        </div>
        <div onClick={AddUserButtonClick} className="admin-panel-add-user">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <div>Add New User</div>
        </div>
      </div>
      <hr className="admin-panel-top-margin" />
      <div className="admin-panel-filter-area admin-panel-top-margin">
        <div className="filter-input-area">
          <div>Find user</div>
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input onChange={filterTextChange} />
          </span>
        </div>
        <div className="filter-input-area">
          <div>By</div>
          <select onChange={filterOptionChange}>
          <option value={"name"} >Name</option>
          <option value={"email"} >EMail</option>
          <option value={"id"} >ID</option>
          </select>
        </div>
        <div className="filter-input-area">
          <div>Show</div>
          <select onChange={roleFilterChange}>
          <option value={-1} >All</option>
          {
            Object.keys(roles).map((key)=>{
              return <option value={key} >{roles[key]}</option>;
            })
          }
          </select>
        </div>
      </div>
      <div className="user-list-container admin-panel-top-margin">
        <table className="users-display ">
          <tr>
            <td>
              <input type={"checkbox"} />
            </td>
            <td>
              User
              {/* User pic, full name, username, id */}
            </td>
            <td>
              Email
            </td>
            <td>
              Verified
            </td>
            <td>
              Role
            </td>
            <td>
              Action
            </td>
          </tr>
          <tbody>
          {
            users.map((user, ind)=>{
              if(!isDisplayed(user)) return <></>

              return <tr key={ind}>
                <td><input type={"checkbox"} /></td>
                <td>
                  <img src={"http://localhost:3001"+(user.profile_pic.length === 0 ? "/users/default_user1.png" : user.profile_pic)} />
                  <div className="user-details">
                    <div>{user.first_name + " " + user.last_name}</div>
                    <div>{user.username}#{user.user_id}</div>
                  </div>
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.is_verified ? "Yes" : "No"}
                </td>
                <td>
                  {roles[user.user_type.type_id]}
                </td>
                <td>
                  <svg onClick={()=>{
                    let visible = document.querySelector(".user-list-manage-dropdown-visible");
                    let current = document.querySelector("#manage-user-"+user.user_id);

                    if(visible == current){
                      current.classList.remove("user-list-manage-dropdown-visible")
                    }else{
                      if(visible) visible.classList.remove("user-list-manage-dropdown-visible")
                      current.classList.add("user-list-manage-dropdown-visible")
                    }
                  }} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 no-close-effect" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                  <div id={"manage-user-"+user.user_id} className="user-list-manage-dropdown no-close-effect">
                    <div className="no-close-effect">Change user info</div>
                    <div className="no-close-effect">Reset password</div>
                  </div>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}