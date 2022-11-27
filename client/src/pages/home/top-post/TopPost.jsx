import React, {useState, useEffect} from 'react';
import './index.css';
import LatestNews from './latest-news/LatestNews';
import TopPostMain from './top-post-main/TopPostMain';
import {getPostByDate} from '../../../util/articleRequests'
import format from '../../../util/format';
import Testpostframe from '../../../components/post-frames/test-post-frame/TestPostFrame';
import OptimizedImage from '../../../components/optimized-image/OptimizedImage';
const maxWidthToPopLatesNews = 800;
 


const cycleTime = 6000;
const length = 3; //nb of  posts to show

export default function TopPost(props) {
  const [clientWidth, setClientWidth] = useState(document.documentElement.clientWidth);
  const [current, setCurrent] = useState(0);
  const [pgbarWidth, setPgbarWidth] = useState(100/length);
  const [posts, setPosts] = useState([]);

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

  // get posts

  useEffect(() => {
    getPostByDate(0, 12)
      .then(posts => { 
        let postsArray = [];
        posts.forEach(post => {
          postsArray.push(format(post));
        });
        setPosts(postsArray);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
 
  return (
    <>
      <div className="top-post ">
        <div className="mid-section">
          <div className="slider-imgs">
            { posts && posts.slice(0, 3).map((d, i) => {
              return (
                <div className={current === i ? "slide active" : "slide"} key={i} >
                  <OptimizedImage
                    url={d.image_path}
                    blurhash={d.blurhash}
                    style={{display: i===current ? 'block' : 'none', filter: 'brightness(0.5)'}}
                  />
                </div>
              )
            })}
          </div>
          {posts.slice(0, 3).map((d, i) => 
            <TopPostMain postData={posts[i]} fade={current === i ? "slide-txt fade-in" : "slide-txt"} key={i}/> 
          )}
          <div className="side-section">
            {posts.slice(6,).map((post, i)=>
                <Testpostframe postData={post} white={true} key={i}/>
            )}
          </div>
          {/* <ProgressBar/> */}
          <div className="progress-bar">
            <div id="evolving-bar"></div>
          </div>
            {posts.length > 0 && clientWidth >maxWidthToPopLatesNews && <LatestNews postData={posts.slice(3,6)}/>}
        </div>
        
      </div>
      {posts.length > 0 && clientWidth <=maxWidthToPopLatesNews && <LatestNews postData={posts.slice(3,6)} style={{"margin-top":".3rem"}}/>}
    </>
  )
}
