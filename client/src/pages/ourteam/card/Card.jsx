import React from 'react'
import {Link} from 'react-router-dom'
import { AiFillBook, AiFillEye } from 'react-icons/ai';
import { MdTextFields } from 'react-icons/md';
import './index.css'

export default function Card(props) {
  const ranking = props.ranking;
  

  return (
    <div className={"card-container "+props.right || ""}> 
      <Link to={'/user?uid='+props.user.user_id}  className="card">
        <div className="card-img">
          {ranking<4&&<div className="card-ranking"> {ranking} </div>}
          <img src={props.user.user_photo} alt=""/>
        </div>
        <div className="card-name">
          <p>{props.user.display_name}</p>
        </div>
        <div className="card-occupation-icon">
          <AiFillBook color='#BE2623'/>
        </div>
        <div className="card-occupation">
          <p>{props.user.user_title}</p>
        </div>
        <div className="card-info">
          <AiFillEye/>
          <span>{props.user.post_views}</span>
          <div className="card-vl-sep"></div>
          <MdTextFields/>
          <span>{props.user.post_number}</span>
        </div>
      </Link>
    </div>
  )
}
