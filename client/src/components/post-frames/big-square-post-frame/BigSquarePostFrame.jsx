import React from 'react';
import './index.css';
import { timeSince } from '../../../util/utilities';
import {AiFillEye} from 'react-icons/ai';
import {MdInsertComment} from 'react-icons/md';

export default function BigSquarePostFrame(props) {

  let link = document.querySelector('big-square-post-main');
  let style = {
    backgroundImage:` url(${process.env.PUBLIC_URL + props.postData.img.imgUrl})`
  }  
  return (
    <div className='big-square-post-frame'>
      <a className="big-square-post-main" href={props.postData.url} style={style}>
        <div className="content-wrapper">
          <h2>{props.postData.category || ''}</h2>
          <div className="big-square-post-bottom">
            <p>
              {props.postData.title || ''}
            </p>
            <div className="big-square-post-author-time">
              <span>{timeSince(props.postData.timeOfPost || '') + ' ago'}&nbsp;&nbsp;</span>
              <span>{props.postData.author || ''}</span> 
            </div>
            <div className="big-square-post-view-comms">
              <AiFillEye/>
              {props.postData.views || ''}
              <div className="vertica-sep-"></div>
              <MdInsertComment/>
              {props.postData.comments || ''}
            </div>
          </div>
        </div>
      </a>
    </div>    
  )
}
