import React from 'react';
import './index.css';
import {AiFillEye} from 'react-icons/ai';



const TopPostMain = (props) => {
  return (
    <div className={'top-post-main ' + props.fade}>
      <h2>{props.postData.category || ''}</h2>
      <p>
        <a href={'/post?pid=' + props.postData.post_id || ''}>
          {props.postData.title || ''}
        </a>
      </p>
      <div className="top-post-bottom">
        <div className="top-post-author-time">
          <span>{(props.postData.createdAt  || '')} ago by&nbsp; </span>
          <span>{props.postData.author_name || ''}</span> 
        </div>
        <div className="top-post-view-comms">
          <AiFillEye/>
          {props.postData.view_count || ''}
        </div>
      </div>
    </div>
  );
}

export default TopPostMain;
