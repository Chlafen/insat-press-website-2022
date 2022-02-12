import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ChangingText from './changingText/ChangingText';
import './index.css';

export default function TopHeader() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en', {hour:'numeric', hour12:true, minute:'numeric'}));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en', {hour:'numeric', hour12:true, minute:'numeric'}))
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="top-header">
      <ChangingText/> 
      <div className="header-center">
        <Link to="/"><img src={process.env.PUBLIC_URL + "images/logo.png"} alt="logo press"/></Link>
      </div>
      <div className="header-right">
        <p> {"Monday "} <span >{time.substring(0, time.length - 3)}</span> {time.substring(time.length-2, time.length)==='AM'? 'a.m.' : 'p.m.'} </p>
      </div>
    </div>
  );
}
