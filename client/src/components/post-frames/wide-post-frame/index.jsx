import React from 'react';
import './index.css'
import {AiFillEye} from 'react-icons/ai';
import {MdInsertComment} from 'react-icons/md';


const WidePostFrame = (props) => {
  return (
    <a href={props.postData.url} className='wide-post-container'>
      <div className='wide-post-img'>
        <img alt={props.postData.img.alt} src={props.postData.img.imgUrl} />
      </div>
      <div className='wide-post-info'>
        <div className='wide-post-title'>
          {props.postData.title}
        </div>
        <div className='wide-post-desc'>
        {(()=>{
          let len=100;
          if(window.innerWidth < 620) len = 100;
          return props.postData.description.length >  len ? props.postData.description.slice(0, len) + "...": props.postData.description;
        })()}
        </div>
        <div className='wide-post-postby'>
          <div className='wide-post-time'>8 hours ago by&nbsp;</div><div className='wide-post-auth'>{props.postData.author}</div>
        </div>
        <div className="wide-post-view-comms">
              <AiFillEye/>
              {props.postData.views || ''}
              <div className="vertica-sep-"></div>
              <MdInsertComment/>
              {props.postData.comments || ''}
            </div>
      </div>
    </a>
  )
}

export default WidePostFrame;
