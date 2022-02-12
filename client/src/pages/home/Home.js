import React from 'react';
import './index.css';
import imag from './img.jpg'

const Home = () => {
  return (
    <div className="home">
      <img src={imag} alt="?" width="100%" height="100vh"/>
    </div>
  );
}

export default Home;
