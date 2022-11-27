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
import { Navigate } from "react-router-dom";
import {formatPost} from './fomratPost';
import { useQuery } from '../../util/utilities';
import { apiGet } from '../../util/apiUtilities';
import format from '../../util/format';
import {getCategoryPosts} from '../../util/articleRequests';
import OptimizedImage from '../../components/optimized-image/OptimizedImage';

const iconSize = 30;

async function getPostData(pid){
  const postData = await apiGet('/api/posts/'+pid, {params:{pid:pid}}); 
  return new Promise((resolve) => {
    resolve(
      postData.data
    );
  }
  );//handle errz
}

export default function Article() {
  const [postData1, setPostData1] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [categoryPosts, setCategoryPosts] = useState([]);
  let query = useQuery(); // this is the query params
  const post_id = query.get("pid");
  //getpost
  useEffect(() => {
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
    let sideTextPosts = []; 
    getCategoryPosts(postData1.category_slug, 7)
        .then(posts => {
          let catPosts = []
          catPosts = posts.map(post => {
            return format(post)
          });
          return catPosts;
        })
        .then(catPosts => { 
          catPosts.forEach(post => {
            sideTextPosts.push(
              post
            );
          });
          setCategoryPosts(sideTextPosts); 
        })
        .catch(err => {
          console.log(err);
        })
  }, [postData1]);

  useEffect(() => {
    let btns = document.querySelector(".react-share__ShareButton") //bug with the class
    while(btns){
      btns.classList.remove("react-share__ShareButton")
      btns = document.querySelector(".react-share__ShareButton")
    }
    btns=document.querySelector(".countset"); 
  }, []);
  
  return (
    redirect ? <Navigate  to="/error404" /> :
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
              <img src={postData1.profile_pic} alt=""/> :
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
          <OptimizedImage
            url={postData1.image_path}
            blurhash={postData1.blurhash}
          />
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
          {
            categoryPosts.length > 0 ?
            categoryPosts.map((post,i) => {
              return  <Testpostframe postData={post} key={i}/>
              }) : <div></div> 
          }
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
      {/* <div className="comments">
        <div className="top-comment">
          <p className='comment-title'>
            The Conversation
          </p>
          <p className="comment-subtitle">Start a discussion, not a fire, Post a comment</p>
        </div>
        <div className="p-horizontal-sep" style={{height:'2px'}}></div>
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" 
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=1045606652975082&autoLogAppEvents=1" 
          nonce="aYijSYxU">
        </script> 
        <div className="fb-comments" data-href={"http://localhost:3000/post?pid="+post_id} data-width="" data-numposts="5"></div>
      </div> */}
      <div className="post-seemore">
        <Category category={{name:"SIMILAR TO THIS"}} isLink={false} />
      </div>

      <SectionPosts sectionData={categoryPosts.length>0?categoryPosts.slice(0,3):[]  }/>
    </div>
  )
}

/*


*/