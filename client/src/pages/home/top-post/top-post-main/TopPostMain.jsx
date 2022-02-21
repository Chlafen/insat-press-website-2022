import React, { useEffect, useState } from 'react';
import './index.css';
import {MdInsertComment} from 'react-icons/md';
import {AiFillEye} from 'react-icons/ai';
import { timeSince } from '../../../../util/utilities';

const postData = {
  title: 'Project Axis, a new axis newly created by IEEE INSAT',
  category: 'Football',
  timeOfPost: new Date(),
  author: 'Nessrine Baltouni',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    imgUrl: 'images/post1.jpg',
    alt: 'A picture'
  },
  views: 158,
  comments: 15,
  url: '/'
}

const postData1 = {
  title: 'Lorem ipsum axis newly created by IEEE INSAT',
  category: 'Sports',
  timeOfPost: new Date(),
  author: 'Nessrine Baltouni',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    imgUrl: 'images/post3.jpg',
    alt: 'A picture'
  },
  views: 158,
  comments: 15,
  url: '/'
}

const postData2 = {
  title: 'Pconsectetur adipiscing elit, sed do eiusmod te incidunt',
  category: 'Science',
  timeOfPost: new Date(),
  author: 'Nessrine Baltouni',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    imgUrl: 'images/post2.jpg',
    alt: 'A picture'
  },
  views: 158,
  comments: 15,
  url: '/'
}



const TopPostMain = (props) => {

  return (
    <div className={'top-post-main ' + props.fade}>
      <h2>{props.postData.category || ''}</h2>
      <p>
        <a href={props.postData.url || ''}>
          {props.postData.title || ''}
        </a>
      </p>
      <div className="top-post-bottom">
        <div className="top-post-author-time">
          <span>{timeSince(props.postData.timeOfPost || '') + ' ago'}&nbsp;&nbsp;</span>
          <span>{props.postData.author || ''}</span> 
        </div>
        <div className="top-post-view-comms">
          <AiFillEye/>
          {props.postData.views || ''}
          <div className="vertica-sep-"></div>
          <MdInsertComment/>
          {props.postData.comments || ''}
        </div>
      </div>
    </div>
  );
}

export default TopPostMain;
