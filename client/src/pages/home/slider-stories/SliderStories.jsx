import React, { useState } from 'react';
import './index.css';
import {BiLeftArrowAlt} from 'react-icons/bi';
import {BiRightArrowAlt} from 'react-icons/bi';
import TopPostMain from '../top-post/top-post-main/TopPostMain';




const postData0 = {
  title: 'Project Axis, a new axis newly created by IEEE INSAT',
  category: 'Football',
  timeOfPost: new Date(),
  author: 'Nessrine Baltouni',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    imgUrl: 'images/post8.jpg',
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

const listData =[postData0, postData1, postData2, postData0, postData1, postData2];

const nbOfSlides = listData.length;

const Sliderstories = () => {
  const [current, setSliderIndex] = useState(0);
  const inc = () => {
    if(current>=nbOfSlides-1){
      setSliderIndex(0);
      return;
    }
    setSliderIndex(current + 1);
  }
  const dec = () => {
    if(current<=0){
      setSliderIndex(nbOfSlides-1);
      return;
    }
    setSliderIndex(current - 1);
  }

  return (
    <div className="slider-stories">
      <div className="slider-stories-imgs">
        {listData.map((d, i) => {
          return (
            <div className={current === i ? "slide-story story-active" : "slide-story"} key={i} >
              {i === current && (<img src={process.env.PUBLIC_URL + '/' + d.img.imgUrl} alt='img' className='slider-story-img'/>)}
            </div>
          )
        })}
      </div>

      <div className="slider-left">
        <div className="slider-navigation">
          <div className="slider-btn" onClick={dec}>
            <BiLeftArrowAlt/>
          </div>
          <p>{`0${current+1} / 0${nbOfSlides}`}</p>
          <div className="slider-btn" onClick={inc}>
            <BiRightArrowAlt/>
          </div>
        </div>

        {listData.map((d, i) => {
          return(
            <TopPostMain postData={listData[i]} fade={current === i ? "slide-story-txt story-fade-in" : "slide-story-txt"} key={i}/>
          )
        })}
      </div>
      <div className="slider-right">
        <p className='long-story-short'>LONG STORY SHORT...</p>
        <p className='story-body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent.
        <br />
        <br />
Elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa... </p>
        <a className='story-read-more hover-red' href="/">READ MORE <BiRightArrowAlt/></a>
      </div>
    </div>
  );
}

export default Sliderstories;
