import React from 'react'
import {Link} from 'react-router-dom'
import { AiFillBook, AiFillEye } from 'react-icons/ai';
import { MdTextFields } from 'react-icons/md';
import './index.css'

let userTemp = {
  user_id: 0,
  username: "",
  first_name: "",
  last_name: "",
  profile_pic: "",
  user_type: 
  {
    type_id: 0,
    title: ""
  },
  post_count: 0,
  view_count: 0
}


export default function Card({user, ranking, right=''}) {
  userTemp = user;

  let Views = userTemp.view_count>0?(<>
      <AiFillEye/>
      <span>{userTemp.view_count}</span>
  </>):null;
  Views = Views && 
    <>
      {Views}
      <div className="card-vl-sep"></div>
    </>

  const Posts = userTemp.post_count>0?(<>
    <MdTextFields/>
    <span>{userTemp.post_count}</span>
  </>):null;

  return (
    <div className={"card-container "+right}> 
      <Link to={'/user?uid='+userTemp.user_id}  className="card">
        <div className="card-img">
          {ranking<4&&<div className="card-ranking"> {ranking} </div>}
          <img src={userTemp.profile_pic} alt=""/>
        </div>
        <div className="card-name">
          <p>{userTemp.first_name +' '+ userTemp.last_name }</p>
        </div>
        <div className="card-occupation-icon">
          <AiFillBook color='#BE2623'/>
        </div>
        <div className="card-occupation">
          <p>{userTemp.user_type.title}</p>
        </div>
        <div className="card-info">
        {Views}
        {Posts}
        </div>
      </Link>
    </div>
  )
}
