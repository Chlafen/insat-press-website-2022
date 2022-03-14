import React, { useEffect, useState } from 'react';
import './index.css';
import WidePostFrame from '../post-frames/wide-post-frame';
import SquarePostFrame from '../post-frames/square-post-frame/SquarePostFrame';


const postData = {
  title: 'Project Axis, a new axis newly created by IEEE INSAT',
  category: 'Football',
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


const widthToChangeToSquarePosts = 500;

export default function SectionPosts() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  });

  
  return (
    <div className='section-posts'>
      <WidePostFrame postData={postData}/>
      {
        screenWidth < widthToChangeToSquarePosts ?
        <>
          <SquarePostFrame postData={postData}/>
          <SquarePostFrame postData={postData}/>
        </> :
        <>
          <WidePostFrame postData={postData}/>
          <WidePostFrame postData={postData}/>
        </>
      }
    </div>
  );
}
