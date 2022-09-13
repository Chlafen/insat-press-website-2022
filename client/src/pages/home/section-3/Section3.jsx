import React, { useEffect, useState } from 'react';
import BigSquarePostFrame from '../../../components/post-frames/big-square-post-frame/BigSquarePostFrame';
import SquarePostFrame from '../../../components/post-frames/square-post-frame/SquarePostFrame';
import { getCategoryPosts, getVideos } from '../../../util/articleRequests';
import './index.css';
import format from '../../../util/format';

const sectionCategory = 'unilife'
const numberOfListItems = 5

export default function Section3(props) {

  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  //get posts
  useEffect(() => {
    getCategoryPosts(sectionCategory, numberOfListItems + 1)
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
  //get vids 
  useEffect(() => {
    getVideos(numberOfListItems)
      .then(videos => {
        let newvids = [];
        videos.map(vid => {
          let a = {
            image_path: vid.thumbnail,
            title: vid.title,
            url: vid.url,
          }
          newvids.push(a);
        });
        setVideos(newvids);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="section-3">
      <div className="section-3-left">
        <div className="top-left-title">
          <p>UNI LIFE</p>
        </div>
        <div className="top-left-sep"></div>
        <div className="section-3-left-posts">
          <div className="section-3-big">
            {posts.length > 0 ? <BigSquarePostFrame postData={posts[0]} /> : ''}
          </div>
          <div className="section-3-post-list section-3-list">
            {
              posts.slice(1).map((post, i) => {
                return <SquarePostFrame key={i} postData={post}/>
              })
            }
          </div>
        </div>
      </div>
      <div className="section-3-sep">
        
      </div>
      <div className="section-3-right">
        <div className="section-3-vid">
          <p className='red-text' >
            VIDEOS
          </p>
        </div>
        <div className="vid-pic-list section-3-list">
          {
            videos.map((vid, i) => {
              return <SquarePostFrame key={i} postData={vid || {}} isVideo={true}/>
            })
          }
        </div>
      </div>
    </div>
  )
}
