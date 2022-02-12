import React from 'react';
import './index.css';

const Navbutton = (props) => {
  return (
    <div className="navbutton">
      <p>{props.label}</p>
    </div>
  );
}

export default Navbutton;
