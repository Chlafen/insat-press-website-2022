import React, {useEffect, useState} from 'react';
import './index.css';
import BigSquarePostFrame from '../../../components/post-frames/big-square-post-frame/BigSquarePostFrame'
import SquarePostFrame from '../../../components/post-frames/square-post-frame/SquarePostFrame';
import Testpostframe from '../../../components/post-frames/test-post-frame/TestPostFrame';
import {FaLongArrowAltRight} from 'react-icons/fa'
import { getPostByDate, getPostByView } from '../../../util/articleRequests';
import format from '../../../util/format';
import { random } from '../../../util/utilities'; 
export default function HeadPosts(props) {
  const [underL, setUnderL] = useState(0);
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  useEffect(()=>{
    const handleC = function(e){
      let index = e.srcElement.id;
      e.target.classList.add('red-text')
      index = index.charAt(index.length - 1)- 1;
      setUnderL(index);
    }

    document.getElementById('head-btn-1').onclick = handleC;
    document.getElementById('head-btn-2').onclick = handleC;


  });
  
  useEffect(()=>{ 
    const len = 11;

    getPostByDate(random(5, 12), len)
      .then(posts => { 
        let postsArray = [];
        posts.forEach(post => {
          postsArray.push(format(post));
        });
        setLatestPosts(postsArray);
      })
      .catch(err => {
        console.log(err);
      });

    //get popular posts
    getPostByView(random(0, 4), 5)
      .then(posts => {
        let postsArray = [];
        posts.forEach(post => {
          postsArray.push(format(post));
        });
        setPopularPosts(postsArray);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);
  
  return (
    <div className="head-posts">
      <div className="head-left-section">
        <div className="left-post-list">
          {
            latestPosts.slice(6,).map((post, index) => {
              return <Testpostframe key={index} postData={post} />
            })
          }
        </div>
        <div className="bottom-left-section">
          <div className="long-bar"></div>
          <div className="bottom-left-seemore">
            <p>SEE MORE LIKE THIS</p>
            <FaLongArrowAltRight className='arr-left'/>
          </div>
        </div>
      </div>

      <div className="head-mid-section">
        <BigSquarePostFrame postData={latestPosts[0]}/>
      </div>      
      <div className="head-right-section">
        <div className="head-navigator">
          <button id='head-btn-1' className={underL===0?'red-text':'gray-text'} >
            Latest
          </button>
          <button id='head-btn-2' className={underL===1?'red-text':'gray-text'} >
            Popular
          </button>
        </div>

        <div className="right-post-list">
          {
            underL===0?
            latestPosts.slice(1,6).map((post, index) => {
              return <SquarePostFrame key={index} postData={post}/>
            })
            :
            popularPosts.map((post, index) => {
              return <SquarePostFrame key={index} postData={post}/>
            })
          }
        </div>
      </div>
    </div>
  )
}
