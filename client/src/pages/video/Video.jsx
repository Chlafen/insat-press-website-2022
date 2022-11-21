import React, { useState, useEffect} from 'react'
import { Navigate  } from 'react-router-dom';
import { useQuery } from '../../util/utilities'
import { getVideos } from '../../util/articleRequests';
import './index.css'
import SquarePostFrame from '../../components/post-frames/square-post-frame/SquarePostFrame';
import SectionTitle from '../../components/section-title/SectionTitle';
import { BiPlay } from 'react-icons/bi';
import VideoFrame from '../../components/post-frames/video-frame/VideoFrame';



const numbVidsToShow = 50;


export default function Video(props) {
  const query = useQuery();
  const vid= query.get('v') || '';
  const url = `https://www.youtube.com/embed/${vid}`;
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    getVideos(numbVidsToShow)
      .then(videos => {
        let newvids = [];
        videos.map(vid => {
          let a = {
            image_path: vid.thumbnail,
            title: vid.title,
            url: vid.url,
            views: vid.views,
          }
          newvids.push(a);
        });
        setVideos(newvids);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return vid?(
    <div className="video-wrapper">
      <div className="video-player">
        <iframe 
          className='video-player-iframe'
          src={url || ''}
          frameBorder="0" 
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div> 
      <a href="https://www.youtube.com/INSATPRESS" className='yt-link' target="#" >
        <BiPlay size="3rem" color="white" />
        <p> &nbsp;Go to our YouTube channel</p>
      </a>
        <SectionTitle title="More Videos" />
        <div className="vid-pic-list section-3-list">
        {
          videos.map((vid, i) => {
            return <VideoFrame key={i} postData={vid}/>
          })
        }
       </div>
    </div>
  ):<Navigate  to='/error404'/>;
}
