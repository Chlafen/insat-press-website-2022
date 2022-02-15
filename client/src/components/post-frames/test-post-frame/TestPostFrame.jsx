import React from 'react';
import {timeSince} from '../../../util/utilities'
import './index.css';

const Testpostframe = (props) => {

  function getTimeSincePosted(){
    const timePosted = props.postData.timeOfPost;

    return timeSince(timePosted) + ""||'';
  }

  return (
    <div className={`test-post-frame ${props.white && "text-white"}`}>
      <div className="test-post-category">
        <div className="test-post-category-circle"></div>
        <p>{props.postData.category}</p>
      </div>
      <h3 className="test-post-title">{props.postData.title}</h3>
      <div className="test-post-time-auth">
        <span className="post-time-since">
          {getTimeSincePosted() + ' ago'} &nbsp;
        </span>
        <span className="post-author">
          {props.postData.author}
        </span>
      </div>
    </div>
  );
}

export default Testpostframe;
