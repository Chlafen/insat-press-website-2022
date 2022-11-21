import React, { useEffect, useState }  from 'react';
import './index.scss';
import {formatNumber} from '../../../util/format';

const VideoFrame = (props) => {
  let vidId = props.postData.url.split('v=')[1];
  let link = '/video?v='+vidId;
  return props.postData?(
    <a className="video-frame" href={link}>
      <div className="video-frame-img">
        <img src={props.postData.image_path || ''} alt=''/>
      </div>
      <div className="video-frame-text">
        <h4>
          {props.postData.title||''}
        </h4>
        <p className='video-views'>
         {formatNumber(props.postData.views)} views
        </p>
      </div>
    </a>
  ):<></>;
}

export default VideoFrame;
