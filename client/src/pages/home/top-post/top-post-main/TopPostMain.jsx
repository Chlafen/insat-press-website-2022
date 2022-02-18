import React from 'react';
import './index.css';
import {MdInsertComment} from 'react-icons/md';
import {AiFillEye} from 'react-icons/ai';
import { timeSince } from '../../../../util/utilities';

const TopPostMain = (props) => {


  return (
    <div className="top-post-main">
      <h2>{props.postData.category || ''}</h2>
      <p>
        <a href={props.postData.url || ''}>
          {props.postData.title || ''}
        </a>
      </p>
      <div className="top-post-bottom">
        <div className="top-post-author-time">
          <span>{timeSince(props.postData.timeOfPost || '') + ' ago'}&nbsp;&nbsp;</span>
          <span>{props.postData.author || ''}</span> 
        </div>
        <div className="top-post-view-comms">
          <AiFillEye/>
          {props.postData.views || ''}
          <div className="vertica-sep-"></div>
          <MdInsertComment/>
          {props.postData.comments || ''}
        </div>
      </div>
    </div>
  );
}

export default TopPostMain;
