import React, { useEffect, useState } from 'react';
import './index.css'; 
import {AiFillEye} from 'react-icons/ai';
import {MdInsertComment} from 'react-icons/md';
import OptimizedImage from '../../optimized-image/OptimizedImage';
import styled from 'styled-components';



export default function BigSquarePostFrame(props) {
  const [postData, setPostData] = useState({});
  useEffect(() => {
    if(props.postData)
      setPostData(props.postData);
  }, [props.postData]);

  let style = {
    backgroundImage:` url(${process.env.PUBLIC_URL + postData.image_path})`
  }  

  return (
    <div className='big-square-post-frame'>
      <a className="big-square-post-main" href={"/post?pid="+postData.post_id} style={style}>
        <OptimizedImage
          style={{position:'absolute', zIndex:1}} 
          url={postData.image_path}
          blurhash={postData.blurhash}
        />
        <div className="content-wrapper">
          <h2>{postData.category || ''}</h2>
          <div className="big-square-post-bottom">
            <p>
              {postData.title || ''}
            </p>
            <div className="big-square-post-author-time">
              <span>{(postData.createdAt || '') + ' ago'}&nbsp;&nbsp;</span>
              <span>{postData.author_name || ''}</span> 
            </div>
            <div className="big-square-post-view-comms">
              <AiFillEye/>
              {postData.view_count || ''}
              <div className="vertica-sep-"></div>
              <MdInsertComment/>
              {postData.comments || ''}
            </div>
          </div>
        </div>
      </a>
    </div>    
  )
}
