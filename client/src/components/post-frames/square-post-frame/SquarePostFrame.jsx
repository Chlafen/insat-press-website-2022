import React from 'react';
import './index.css'
import {AiFillPlayCircle} from 'react-icons/ai'
import OptimizedImage from '../../optimized-image/OptimizedImage';

export default function SquarePostFrame(props) {
  if( !props.postData) return <></>
  let vidId ='';
  if(props.isVideo)
    vidId = props.postData.url.split('v=')[1];
  let link =  props.isVideo ? '/video?v='+vidId : "/post?pid="+props.postData.post_id;
  return props.postData?(
    <a className="square-post-frame" href={link}>
      <div className="square-post-frame-img">
        {
        props.isVideo? 
          (<AiFillPlayCircle className='play-btn' color='var(--clr-red)' size='30%'/>)
          :''
        }
        <OptimizedImage
          className='square-post-frame-img-img'
          url={props.postData.image_path}
          blurhash={props.postData.blurhash}
        />
      </div>
      <div className="square-post-frame-text">
        <h4>
          {props.postData.title||''}
        </h4>
        <div className="square-post-frame-bottom">
          <span className="time-since-posted">
            { props.isVideo?'': props.postData.createdAt + " ago"}
            </span>
          <span className="square-post-frame-category">
            { props.isVideo?'':(props.postData.category || '')}
          </span>
        </div>
      </div>
    </a>
  ):<></>;
}

