import React from "react";
import AdminPanelUserForm from "../admin-panel-user-form";
import LineNavigator from "../line-navigator";

export default function AdminPanelAddUserDisplay({}) {
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
          },
          {
            title: "New",
            redirection: "/admin/users/new"
          }
        ]}
      />
      <div className="admin-panel-row admin-panel-top-margin admin-panel-sides-padding">
        <div className="admin-panel-section-title">
          New User
        </div>
      </div>
      <hr className="admin-panel-top-margin" />
      <div className="admin-panel-top-margin">
        <AdminPanelUserForm 
          onSubmit={()=>{
            
          }}
        />
      </div>
    </div>
  );
}