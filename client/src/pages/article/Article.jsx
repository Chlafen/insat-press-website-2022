import React, {useEffect, useState} from 'react';
import './index.css';
import {MdAccessAlarm} from 'react-icons/md';
import {AiFillEye} from "react-icons/ai"
import {
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  RedditShareButton, RedditIcon,
  TwitterShareButton, TwitterIcon
} from "react-share";
import Category from '../../components/category/Category';
import SectionPosts from '../../components/section-posts/SectionPosts';
import Testpostframe from '../../components/post-frames/test-post-frame/TestPostFrame';
import { Redirect } from "react-router-dom";
import {formatPost} from './fomratPost';
import { useQuery } from '../../util/utilities';
import { apiGet } from '../../util/apiUtilities';


const iconSize = 30;

const postData2 = {
  title: 'Project Axis, a new axis newly created by IEEE INSAT',
  category: 'Football',
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

export default function Article() {
  const [postData1, setPostData1] = useState({});
  const [redirect, setRedirect] = useState(false);
  let query = useQuery(); // this is the query params
  const post_id = query.get("pid");
  
  useEffect(() => {
    async function getPostData(pid){
      const postData = await apiGet('/api/posts/'+post_id, {params:{pid:pid}}); 
      return new Promise((resolve) => {
        resolve(
          postData.data
        );
      }
      );//handle errz
    }
    getPostData(post_id)
    .then(data =>{  
      const post = formatPost(data.data);
      setPostData1(post);
    })
    .catch(err => {
      console.log(err);
      setRedirect(true);
    });
  }, []);

  useEffect(() => {
    let btns = document.querySelector(".react-share__ShareButton") //bug with the class
    while(btns){
      btns.classList.remove("react-share__ShareButton")
      btns = document.querySelector(".react-share__ShareButton")
    }
    btns=document.querySelector(".countset");
    console.log(btns)
  }, []);
  
  return (
    redirect ? <Redirect to="/error404" /> :
    <div className="article">
      {/* facebook comments integration */}
      <div className="p-header">
        <div className="p-category-date">
          <h3 className='p-category'>{postData1.category}</h3>
          <div className="p-vertical-sep"></div>
          <p className="p-time-posted">{postData1.createdAt}</p>
          <div className="p-vertical-sep"></div>
          <MdAccessAlarm/>
          <p className="avg-time-to-read">{ postData1.avg } min. read</p>
        </div>
        <div className="p-title">{postData1.title}</div>
        <div className="p-author-info">
          <div className="p-author-img">
            { postData1.profile_pic ?
              <img src={"http://localhost:3001"+postData1.profile_pic} alt="author-img"/> :
              <div></div>
            }
          </div>
          <div className="p-author-desc">
            <p>Written by</p>
            <span className='p-author-name'>{postData1.author_name}</span>
          </div>
        </div>
      </div>
      {postData1.image_path?<>
        <div className="p-horizontal-sep"></div>
        <div className="p-image">
          <img src={postData1.image_path} alt="" />
        </div>  
        </>
        :null
      }
      <div className="p-views-comms">
        <AiFillEye/>
        {postData1.view_count || ''}
      </div>
      <div className="p-horizontal-sep"></div>
      <div className="p-body-mid">
        <div className="post-content">
          {postData1.content}
        </div>
        <div className="p-v-sep toggle-p"></div>

        <div className="p-text-post-list toggle-p">
          <Testpostframe postData={postData2}/>
          <Testpostframe postData={postData2}/>
          <Testpostframe postData={postData2}/>
          <Testpostframe postData={postData2}/>
          <Testpostframe postData={postData2}/>
        </div>
      </div>

      <div className="shar-post">
        <p>Share:</p>
        <div className="icons-scl">
          <TwitterShareButton
            hashtags={["insatpress", postData1.category]}
            url={window.location.href}
          >
            <TwitterIcon size={iconSize} />
          </TwitterShareButton>
          <FacebookShareButton
            hashtag='insatpress'
            url={window.location.href}
          >
            <FacebookIcon size={iconSize} />
          </FacebookShareButton>
          <RedditShareButton
            url={window.location.href}
          >
            <RedditIcon size={iconSize} />
          </RedditShareButton>
          <LinkedinShareButton
            url={window.location.href}
          >
            <LinkedinIcon size={iconSize} />
          </LinkedinShareButton>
        </div>
      </div>  
      <div className="comments">
        <div className="top-comment">
          <p className='comment-title'>
            The Conversation
          </p>
          <p className="comment-subtitle">Start a discussion, not a fire, Post a comment</p>
        </div>
        <div className="p-horizontal-sep" style={{height:'2px'}}></div>
        {/* <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=1045606652975082&autoLogAppEvents=1" nonce="aYijSYxU"></script> */}
        <div className="fb-comments" data-href={"http://localhost:3000/post?pid="+post_id} data-width="" data-numposts="5"></div>
      </div>
      <div className="post-seemore">
        <Category category="SIMILAR TO THIS" isLink={false} />
      </div>

      <SectionPosts postData={[postData1, postData1, postData1]}/>
    </div>
  )
}

/*


*/