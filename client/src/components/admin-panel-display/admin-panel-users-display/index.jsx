import React from "react";
import LineNavigator from "../line-navigator";
import './style.css'

export default function AdminPanelUserDisplay({}) {
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
    </div>
  );
}