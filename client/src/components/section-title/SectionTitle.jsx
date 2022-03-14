import React from "react";
import './index.css';


export default function SectionTitle(props){

  return (
    <div className="section-title">
      <div className="horizontal-sep-title"></div>
      <p>{props.title}</p>
      <div className="horizontal-sep-title"></div>
    </div>
  );
}