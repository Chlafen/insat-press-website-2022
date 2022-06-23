import React from "react";
import './style.css'

export default function LineNavigator({sections}) {
  return (
    <div className="line-navigator">
      {
        sections.map((section, ind)=>{
          return (
            <>
              <div
                onClick={()=>{
                  window.location.href = section.redirection;
                }}
                className={"line-navigator-section" + (ind === sections.length-1 ? " navigator-selected-section" : "")}>
                  {section.title}
              </div>

              {ind === sections.length-1 ? <></> : <div>{">"}</div> }
            </>
          );
        })
      }
      
    </div>
  );
}