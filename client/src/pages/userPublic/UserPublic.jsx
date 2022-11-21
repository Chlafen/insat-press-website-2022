import React, {useEffect, useState} from 'react';
import './index.scss';
import { useQuery } from '../../util/utilities';
import { getPostsByUser } from '../../util/articleRequests';
import { getOneUser } from '../../util/apiUtilities';
import { AiFillEye } from 'react-icons/ai';
import { MdArticle } from 'react-icons/md';
import { CountUp } from 'use-count-up';
import format from '../../util/format';
import InfiniteScroll from 'react-infinite-scroller'
import SectionPosts from '../../components/section-posts/SectionPosts'


const UserPublic = () => {
  //get query params
  const query = useQuery();
  const userId = query.get('uid');
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [stats, setStats] = useState([0, 0]);



  //get user data
  useEffect(() => {
    getOneUser(userId)
      .then(user => { 
        if(!user) 
          window.location.href = '/error404';
        setUserInfo(user); 
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getPostsByUser(userId)
    .then(posts => { 
      //regroup posts by 3
      let postsBy3 = [];
      let temp = [];
      posts.forEach((post, index) => {
        stats[0] += post.view_count;
        stats[1] += 1;
        temp.push(format(post));
        if((index + 1) % 3 === 0) {
          postsBy3.push(temp);
          temp = [];
        }
      });
      setStats(stats);
      setPosts(postsBy3);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);



  return userInfo?(
    <div className="user-public">
      <div className="user-header-container">
        <h1>Profile</h1>
        <div className="profile-header">
          <div className="profile-header-left">
            <div className="profile-header-img">
              <img src={userInfo?.profile_pic || ''} alt="" />
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
                  start={Math.floor(stats[0]/2)}
                  end={stats[0]}  
                  duration={2.1}
                  easing="easeOutCubic"   
                />
              </p>
            </div>
            <div className="user-posts">
              <MdArticle/>
              <p>
                <CountUp isCounting 
                  start={Math.floor(stats[1]/2)}
                  end={stats[1]}  
                  duration={2.1}
                  easing="easeOutCubic"   
                />
              </p>
            </div>
          </div>
        </div>
        <div className="horizontal-sep"></div>
      {posts.length === 0 && <p className="no-posts">No posts yet</p>}    
      </div>
      {posts.map((post, index) => {
        return (
          <div key={index} className="user-section-container">
            <SectionPosts  sectionData={post} categPage/>
          </div>
        )
      })}
    </div>
  ):<></>;
}

export default UserPublic;
