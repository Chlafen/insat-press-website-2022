import React, { useEffect, useState } from 'react';
import BigSquarePostFrame from '../../../components/post-frames/big-square-post-frame/BigSquarePostFrame';
import SquarePostFrame from '../../../components/post-frames/square-post-frame/SquarePostFrame';
import './index.css';


export default function Section3(props) {


  return (
    <div className="section-3">
      <div className="section-3-left">
        <div className="top-left-title">
          <p>UNI LIFE</p>
        </div>
        <div className="top-left-sep"></div>
        <div className="section-3-left-posts">
          <div className="section-3-big">
            <BigSquarePostFrame postData={props.postData}/>
          </div>
          <div className="section-3-post-list section-3-list">
            <SquarePostFrame postData={props.postData}/>
            <SquarePostFrame postData={props.postData}/>
            <SquarePostFrame postData={props.postData}/>
            <SquarePostFrame postData={props.postData}/>
            <SquarePostFrame postData={props.postData}/>
            <SquarePostFrame postData={props.postData}/>
          </div>
        </div>
      </div>
      <div className="section-3-sep">
        
      </div>
      <div className="section-3-right">
        <div className="section-3-vid">
          <p className='red-text' >
            VIDEOS
          </p>
        </div>
        <div className="vid-pic-list section-3-list">
          <SquarePostFrame isVideo={true} postData={props.postData}/>
          <SquarePostFrame isVideo={true} postData={props.postData}/>
          <SquarePostFrame isVideo={true} postData={props.postData}/>
          <SquarePostFrame isVideo={true} postData={props.postData}/>
          <SquarePostFrame isVideo={true} postData={props.postData}/>
          <SquarePostFrame isVideo={true} postData={props.postData}/>
        </div>
      </div>
    </div>
  )
}
