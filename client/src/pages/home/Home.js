import React from 'react';
import './index.css';
import TopPost from './top-post/TopPost'
import HeadPosts from './head-posts/HeadPosts';


const postData = {
  title: 'Project Axis, a new axis newly created by IEEE INSAT',
  category: 'Football',
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

const Home = () => {
  return (
    <div className="home">
      <TopPost postData={postData}/>
      <HeadPosts postData={postData}/>
    </div>
  );
}

export default Home;
