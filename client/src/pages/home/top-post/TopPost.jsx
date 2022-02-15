import React, {useState, useEffect} from 'react';
import './index.css';
import LatestNews from './latest-news/LatestNews';
import ProgressBar from './progress-bar/ProgressBar';


const maxWidthToPopLatesNews = 800;

export default function TopPost(props) {
  const [clientWidth, setClientWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    function handleResize() {
      setClientWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  });

  const listData =[props.postData,props.postData,props.postData];
  return (
    <div className="top-post" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}images/post4.jpg)` /* TODO: change this to be a post img url*/}}>
      <div className="mid-section">
        <ProgressBar/>
        {clientWidth >maxWidthToPopLatesNews && <LatestNews postData={listData}/>}
      </div>
      {clientWidth <=maxWidthToPopLatesNews && <LatestNews postData={listData} style={{"margin-top":".3rem"}}/>}
    </div>
  )
}
