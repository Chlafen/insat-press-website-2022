import React from "react";
import './style.css'

export default function SideMenuButton({data, onChange, selected}) {
  return (
    <div onClick={onChange} className="side-menu-button">
      {selected ? <div className="selected-side-menu-button"></div> : <></>}
      <div className="hover-effect"></div>
      <div className="side-menu-button-icon">
        {data.icon}
      </div>
      <div className="side-menu-button-title">
        {data.title}
      </div>
    </div>
  );
}