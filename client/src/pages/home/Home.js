import React from 'react';
import './index.css';
import imag from './img.jpg';
import WidePostFrame from '../../components/post-frames/wide-post-frame';

const postData = {
  title: 'Lorem ipsum dolor sit amet, consectetur aad byea',
  category: 'Football',
  timeOfPost: new Date(),
  author: 'Nessrine Baltouni',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    imgurl: 'post-pic/post1.jpg',
    alt: 'A picture'
  },
  views: 158,
  comments: 15
}

const Home = () => {
  return (
    <div className="home">
      <img src={imag} alt="?" width="100%" height="100vh"/>

      <div className='wide-post-display'>
      <WidePostFrame post={postData} />
      <WidePostFrame post={postData} />
      <WidePostFrame post={postData} />
      </div>
    </div>
  );
}

export default Home;
