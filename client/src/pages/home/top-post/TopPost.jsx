import React, {useState, useEffect} from 'react';
import './index.css';
import LatestNews from './latest-news/LatestNews';
import TopPostMain from './top-post-main/TopPostMain';

const maxWidthToPopLatesNews = 800;

const postData0 = {
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
const cycleTime = 6000;

export default function TopPost(props) {
  const [clientWidth, setClientWidth] = useState(document.documentElement.clientWidth);
  const [current, setCurrent] = useState(0);
  const [pgbarWidth, setPgbarWidth] = useState(100/3);

  const length = 3; //nb of the posts

  useEffect(() => {
    function handleResize() {
      setClientWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  });

  //slider + pgbar
  useEffect(() => {
    let evbar = document.getElementById('evolving-bar');
    evbar.style.trasition = 'left ' + cycleTime/1000 + 's linear';
    let interval = setInterval(() =>{
      setCurrent(current === length-1 ? 0 : current + 1);
      setPgbarWidth(pgbarWidth >= 60 ? 0 : pgbarWidth + 33.34);
      evbar.style.left = pgbarWidth + '%';      
    }, cycleTime);
    return () => clearInterval(interval);
  });

  const listData =[postData0, postData1, postData2];
  return (
    <>
      <div className="top-post ">
        <div className="mid-section">
        <div className="slider-imgs">
          {listData.map((d, i) => {
            return (
              <div className={current === i ? "slide active" : "slide"} key={i} >
                {i === current && (<img src={process.env.PUBLIC_URL + '/' + d.img.imgUrl} alt='img' className='slider-img'/>)}
              </div>
            )
          })}
        </div>
          {listData.map((d, i) => {
            return(
              <TopPostMain postData={listData[i]} fade={current === i ? "slide-txt fade-in" : "slide-txt"} key={i}/>
            )
          })}
          {/* <ProgressBar/> */}
          <div className="progress-bar">
            <div id="evolving-bar"></div>
          </div>
          {clientWidth >maxWidthToPopLatesNews && <LatestNews postData={listData}/>}
        </div>
        
      </div>
      {clientWidth <=maxWidthToPopLatesNews && <LatestNews postData={listData} style={{"margin-top":".3rem"}}/>}
    </>
  )
}
