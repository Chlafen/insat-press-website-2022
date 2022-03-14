import React from 'react';
import postDataTemplate from '../postDataTemplate';
import './index.css'
import {timeSince} from '../../../util/utilities'
import {AiFillPlayCircle} from 'react-icons/ai'

export default function SquarePostFrame(props) {


  function getTimeSincePosted(){
    const timePosted = props.postData.timeOfPost;

    return timeSince(timePosted) + ""||'';
  }

  return (
    <a className="square-post-frame" href={props.postData.url}>
      <div className="square-post-frame-img">
        {
        props.isVideo? 
          (<AiFillPlayCircle className='play-btn' color='var(--clr-red)' size='30%'/>)
          :''
        }
        <img src={props.postData.img.imgUrl || ''} alt={props.postData.img.imgAlt || ''} />
      </div>
      <div className="square-post-frame-text">
        <h4>
          {props.postData.title||''}
        </h4>
        <div className="square-post-frame-bottom">
          <span className="time-since-posted">
            {getTimeSincePosted() + " ago"}
            </span>
          <span className="square-post-frame-category">
            {props.postData.category || ''}
          </span>
        </div>
      </div>
    </a>
  );
}

