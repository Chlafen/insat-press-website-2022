import React from 'react';
import SquarePostFrame from '../../../../components/post-frames/square-post-frame/SquarePostFrame'
import './index.css';

const LatestNews = (props) => {
  return (
    <div className="latest-news">
      <p className="latest-news-title">Latest News</p>
      <div className="latest-news-list">
        <SquarePostFrame postData={props.postData [0]}/>
        <div className="vertical-separator"></div>
        <SquarePostFrame postData={props.postData[1]}/>
        <div className="vertical-separator"></div>
        <SquarePostFrame postData={props.postData[2]}/>
      </div>
    </div>
  );
}

export default LatestNews;
