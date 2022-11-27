import React from 'react';
import './index.css'
import {AiFillEye} from 'react-icons/ai';
import {MdInsertComment} from 'react-icons/md'; 
import OptimizedImage from '../../optimized-image/OptimizedImage';


const WidePostFrame = (props) => { 
  //generate random number between 5 and 50
  const randomNumber = Math.floor(Math.random() * (15 - 5 + 1)) + 2;
  return (
    <a href={'/post?pid='+(props.postData.post_id || '')} className='wide-post-container'>
      <div className='wide-post-img'>
        <OptimizedImage
          url={props.postData.image_path}
          blurhash={props.postData.blurhash}
        />
      </div>
      <div className='wide-post-info'>
        <div className='wide-post-title'>
          {props.postData.title || ''}
        </div>
        <div className='wide-post-desc'>
        {/* {(()=>{
          let len=100;
          if(window.innerWidth < 620) len = 100;
          return props.postData.content || '';
        })()} */}
        </div>
        <div className='wide-post-postby'>
          <div className='wide-post-time'>{props.postData.createdAt || ''} ago by&nbsp;</div><div className='wide-post-auth'>{props.postData.author_name || ''}</div>
        </div>
        <div className="wide-post-view-comms">
              <AiFillEye/>
              {props.postData.view_count || '' || ''}
              <div className="vertica-sep-"></div>
              <MdInsertComment/> 
              {randomNumber}
            </div>
      </div>
    </a>
  )
}

export default WidePostFrame;
