import React from "react";
import LineNavigator from "../line-navigator";
import './style.css';

const users = [
  {
    "user_id": 1, 
    "username": "insatpress", 
    "first_name": "insatpress", 
    "last_name": "", 
    "email": "insat.press@gmail.com", 
    "join_date": "2017-06-14 20:01:02", 
    "profile_pic": "/users/default_user1.png", 
    "type_id": 1, 
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
    "type_id": 2, 
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
    "type_id": 2, 
    "is_verified": 0
  }
]

const roles = {
  1: "Administrator",
  2: "Editor",
  3: "User"
}

export default function AdminPanelUserDisplay({}) {
  const AddUserButtonClick = ()=>{}

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
          <input />
          </span>
        </div>
        <div className="filter-input-area">
          <div>By</div>
          <select>
          <option value={"name"} >Name</option>
          <option value={"email"} >EMail</option>
          <option value={"id"} >ID</option>
          </select>
        </div>
        <div className="filter-input-area">
          <div>Show</div>
          <select>
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
              return <tr key={ind}>
                <td><input type={"checkbox"} /></td>
                <td>
                  <img src={"http://localhost:3001"+user.profile_pic} />
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
                  {roles[user.type_id]}
                </td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
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