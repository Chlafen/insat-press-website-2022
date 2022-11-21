import React, { useEffect, useState } from 'react';
import './index.css';
import {BiLeftArrowAlt} from 'react-icons/bi';
import {BiRightArrowAlt} from 'react-icons/bi';
import TopPostMain from '../top-post/top-post-main/TopPostMain';
import { getCategoryPosts } from '../../../util/articleRequests';
import {formatPost} from '../../article/fomratPost'
import { textContent } from '../../../util/format';

const nbOfSlides = 8;

const Sliderstories = () => {
  const [current, setSliderIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

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

  useEffect(() => {
    let listData = [];
    getCategoryPosts('a_vos_plumes', nbOfSlides)
      .then(posts => {
        posts.forEach(post => {
          let id = post.post_id;
          let a = formatPost(post);
          if(typeof a.content !== 'string')
            a.content = a.content.map(c => textContent(c)).join(' ');
          a.content = a.content.substring(0, 500) + ' . . .';
          a.post_id = id;
          listData.push(a);
        });
        setPosts(listData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="slider-stories">
      <div className="slider-stories-imgs">
        {posts.map((d, i) => {
          return (
            <div className={current === i ? "slide-story story-active" : "slide-story"} key={i} >
              {i === current && (<img src={d.image_path} alt='img' className='slider-story-img'/>)}
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

        {posts.map((d, i) => {
          return(
            <TopPostMain postData={d} fade={current === i ? "slide-story-txt story-fade-in" : "slide-story-txt"} key={i}/>
          )
        })}
      </div>
      <div className="slider-right">
        <p className='long-story-short'>LONG STORY SHORT...</p>
        <p className='story-body'>
          <br />
          {posts[current]?.content}
        </p>
          <br />
        <a className='story-read-more hover-red' href={'/post?pid=' + posts[current]?.post_id || ''}>READ MORE <BiRightArrowAlt/></a>
      </div>
    </div>
  );
}

export default Sliderstories;
