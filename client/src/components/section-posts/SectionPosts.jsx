import React, { useEffect, useState } from 'react';
import './index.css';
import WidePostFrame from '../post-frames/wide-post-frame';
import SquarePostFrame from '../post-frames/square-post-frame/SquarePostFrame';


const widthToChangeToSquarePosts = 500;

export default function SectionPosts(props) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [sectionData, setSectionData ] = useState([{},{},{}]) ; //list of posts

  useEffect(() => {
    setSectionData(props.sectionData);
  }, [props.sectionData]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  });

  
  return (
    <div className='section-posts'>
      {
        sectionData[0]?  <WidePostFrame postData={sectionData[0]}/> : <div style={{width:'100%'}}></div>
      }
      {
        screenWidth < widthToChangeToSquarePosts ?
        <>
          {sectionData[1]?  <SquarePostFrame postData={sectionData[1]}/> : <div style={{width:'100%'}}></div>}
          {sectionData[2]?  <SquarePostFrame postData={sectionData[2]}/> : <div style={{width:'100%'}}></div>}
        </> :
        <>
          {sectionData[1]? <WidePostFrame postData={sectionData[1]}/> : <div style={{width:'100%'}}></div>}
          {sectionData[2]? <WidePostFrame postData={sectionData[2]}/> : <div style={{width:'100%'}}></div>}
        </>
      }
    </div>
  );
}
