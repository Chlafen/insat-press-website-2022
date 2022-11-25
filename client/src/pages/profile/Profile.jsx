import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
import {AiFillEye} from 'react-icons/ai';
import {MdArticle} from 'react-icons/md';  
import { CountUp } from 'use-count-up'
import {getUserInfo} from '../../util/apiUtilities';
import { AuthContext } from '../../context/authContext';
import UserPostFrame from '../../components/post-frames/user-post-frame/UserPostFrame';
import { getPostsByUser } from '../../util/articleRequests';

const obj = {
  "drafts": [],
  "published": [],
  "awaiting": []
}

const Profile = () => {
  const [underL, setUnderL] = useState(1);
  const [views, setViews] = useState(0);
  const [published, setPublished] = useState(0);
  const [articles, setArticles] = useState(obj);
  const [userInfo, setUserInfo] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(()=>{
    const handleC = function(e){
      let index = e.srcElement.id;
      e.target.classList.add('red-text')
      index = index.charAt(index.length - 1)- 1;
      setUnderL(index);
    }

    let b1 = document.getElementById('head-btn-1')
    let b2 = document.getElementById('head-btn-2')
    let b3 = document.getElementById('head-btn-3')
    if (b1) b1.addEventListener('click', handleC);
    if (b2) b2.addEventListener('click', handleC);
    if (b3) b3.addEventListener('click', handleC);
    return () => {
      if (b1) b1.removeEventListener('click', handleC);
      if (b2) b2.removeEventListener('click', handleC);
      if (b3) b3.removeEventListener('click', handleC);
    }
  });

  //get userData
  useEffect(()=>{
    //no token
    if(!auth.currentUser()){
      window.location.href = '/login';
      return;
    }
    getUserInfo().then((info)=>{
      if(!info){
        window.location.href = '/login';
        return;
      }else setUserInfo(info)
    })
  }, []);
  
  useEffect(()=>{
    if(userInfo?.user_id)
      getPostsByUser(userInfo.user_id)
        .then((res)=>{
          let totviews = 0;
          let totarticles = 0; 
          let tmpposts = [];
          res.forEach((post)=>{
            if(post.type ==="public"){
              totviews += post.view_count;
              totarticles += 1;
            }
            tmpposts = [...tmpposts, post]
          })
          let drafts    = res.filter((post)=>post.type === 'draft');
          let published = res.filter((post)=>post.type === 'public');
          let awaiting  = res.filter((post)=>post.type === 'unapproved');

          setArticles({drafts, published, awaiting});
          setViews(totviews);
          setPublished(totarticles);
        }) 
        .catch((err)=>{
          console.log(err);
        })
  },[userInfo]); 

  return  userInfo?(
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-header-left">
          <div className="profile-header-img">
            <img src={userInfo?.profile_pic || ''} alt="" />
            {/* <div className="edit-img">
              <MdModeEditOutline />
            </div> */}
          </div>
          <div className="profile-header-info">
            <p className="profile-username">@{userInfo?.username||''}</p>
            <p className="profile-name">{userInfo?.first_name||''} <br/> {userInfo?.last_name ||''}</p>
          </div>     
        </div>
        <div className="user-statistics">
          <div className="user-views">
            <AiFillEye />
            <p>
              <CountUp isCounting 
                start={Math.floor(views/2)}
                end={views}  
                duration={2.1}
                easing="easeOutCubic"   
              />
            </p>
          </div>
          <div className="user-posts">
            <MdArticle/>
            <p>
              <CountUp isCounting 
                start={Math.floor(published/2)}
                end={published}  
                duration={2.1}
                easing="easeOutCubic"   
                />
            </p>
          </div>
        </div>
      </div>
      <div className="horizontal-sep"></div>
      <Link className="create-post-button" to="/editor">Create Article</Link>

      <div className="head-navigator">
        <button id='head-btn-2' className={underL===1?'red-text':'gray-text'} >
          Published
        </button>
        <button id='head-btn-1' className={underL===0?'red-text':'gray-text'} >
          Drafts
        </button>
        <button id='head-btn-3' className={underL===2?'red-text':'gray-text'} >
          Awaiting Approval
        </button>
      </div>
      <div className="profile-posts">
        {
          underL===0?
          <div className="drafts">
            {
              articles.drafts.length===0?
              <p className="no-posts">No drafts</p>:
              articles.drafts.map((post)=>{
              return <UserPostFrame key={post.post_id} postData={post} userId={userInfo?.user_id} isDraft/>
            })} 
          </div>
          :underL===1?
          <div className="published">
            { 
              articles.published.length === 0?
              <p className="no-posts">No published articles</p>:
              articles.published.map((post)=>{
              return <UserPostFrame key={post.post_id} postData={post} userId={userInfo?.user_id} isPublished/>
            })}
          </div>:
          <div className="awaiting">
            {
              articles.awaiting.length === 0?
              <p className="no-posts">No posts awaiting approval</p>:
              articles.awaiting.map((post)=>{
                return <UserPostFrame key={post.post_id} postData={post} userId={userInfo?.user_id} isAwaiting/>
              })
            }
          </div>          
        }
      </div>
    </div>
  ):<></>;
}


export default Profile;
