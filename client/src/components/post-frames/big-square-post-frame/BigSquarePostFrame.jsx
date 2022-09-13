import React, { useEffect, useState } from 'react';
import './index.css';
import { timeSince } from '../../../util/utilities';
import {AiFillEye} from 'react-icons/ai';
import {MdInsertComment} from 'react-icons/md';

export default function BigSquarePostFrame(props) {
  const [postData, setPostData] = useState({});
  useEffect(() => {
    setPostData(props.postData);
  }, [props.postData]);

  let style = {
    backgroundImage:` url(${process.env.PUBLIC_URL + props.postData.image_path})`
  }  

  return (
    <div className='big-square-post-frame'>
      <a className="big-square-post-main" href={"/post?pid="+props.postData.post_id} style={style}>
        <div className="content-wrapper">
          <h2>{props.postData.category || ''}</h2>
          <div className="big-square-post-bottom">
            <p>
              {props.postData.title || ''}
            </p>
            <div className="big-square-post-author-time">
              <span>{(props.postData.createdAt || '') + ' ago'}&nbsp;&nbsp;</span>
              <span>{props.postData.author_name || ''}</span> 
            </div>
            <div className="big-square-post-view-comms">
              <AiFillEye/>
              {props.postData.view_count || ''}
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
