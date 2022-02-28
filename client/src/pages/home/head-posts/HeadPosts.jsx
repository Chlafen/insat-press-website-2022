import React, {useEffect, useState} from 'react';
import './index.css';
import BigSquarePostFrame from '../../../components/post-frames/big-square-post-frame/BigSquarePostFrame'
import SquarePostFrame from '../../../components/post-frames/square-post-frame/SquarePostFrame';
import Testpostframe from '../../../components/post-frames/test-post-frame/TestPostFrame';
import {FaLongArrowAltRight} from 'react-icons/fa'

export default function HeadPosts(props) {
  const [underL, setUnderL] = useState(0);
  useEffect(()=>{
    const handleC = function(e){
      let index = e.srcElement.id;
      e.target.classList.add('red-text')
      index = index.charAt(index.length - 1)- 1;
      setUnderL(index);
    }

    document.getElementById('head-btn-1').onclick = handleC;
    document.getElementById('head-btn-2').onclick = handleC;
    document.getElementById('head-btn-3').onclick = handleC;


  });
  
  
  return (
    <div className="head-posts">
      <div className="head-left-section">
        <div className="left-post-list">
          <Testpostframe postData={props.postData}/>
          <Testpostframe postData={props.postData}/>
          <Testpostframe postData={props.postData}/>
          <Testpostframe postData={props.postData}/>
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
        <BigSquarePostFrame postData={props.postData}/>
      </div>      
      <div className="head-right-section">
        <div className="head-navigator">
          <button id='head-btn-1' className={underL===0?'red-text':'gray-text'} >
            Latest
          </button>
          <button id='head-btn-2' className={underL===1?'red-text':'gray-text'} >
            Popular
          </button>
          <button id='head-btn-3' className={underL===2?'red-text':'gray-text'} >
            Recommended
          </button>
        </div>
        <div className="right-post-list">
          <SquarePostFrame postData={props.postData}/>
          <div className="vertical-separator visib-800"></div>
          <SquarePostFrame postData={props.postData}/>
          <div className="vertical-separator visib-800"></div>
          <SquarePostFrame postData={props.postData}/>
          <div className="vertical-separator visib-800"></div>
          <SquarePostFrame postData={props.postData}/>
          <div className="vertical-separator visib-800"></div>
          <SquarePostFrame postData={props.postData}/>
        </div>
      </div>
    </div>
  )
}
