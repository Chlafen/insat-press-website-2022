import React, {useState, useEffect} from 'react';
import './index.scss'; 
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {FiUpload} from 'react-icons/fi';  
import { deletePost, publishPost } from '../../../util/articleRequests';
import OptimizedImage from '../../optimized-image/OptimizedImage';

const UserPostFrame = (props) => {
  const [postData, setPostData] = useState(null);


  //get screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function deletePostBtn(){
    if(window.confirm(`Are you sure you want to delete post #${props.postData.post_id}?`) ===true){
      deletePost(props.postData.post_id)
        .then((res)=>{
          if(res===true) {
            alert('Post deleted successfully!'); 
            window.location.reload();
          }else
            alert('Something went wrong!');
        })
    }


    console.log('delete post');
  }
  function editPost(){
    console.log('edit post');
  }
  function publishPostBtn(){
    publishPost(props.postData.post_id)
      .then((res)=>{
        if(res===true) {
          //TODO: handle admin publish
          alert('Post published successfully!, awaiting admin approval');
          window.location.reload();
        }else
          alert('Something went wrong!');
      })
    console.log('publish post');

  }

  useEffect(()=>{
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize);}
  }, []);


  useEffect(()=>{
    if(props.postData){

      setPostData(props.postData);
    }
  }, [props.postData]);

  return (
    <div className="user-post-frame">
      <a className="user-post-info" href={'/post?pid=' + postData?.post_id }>
        <div className="user-post-image">
          <OptimizedImage
            url={postData?.image_path}
            blurhash={postData?.blurhash}
          />
        </div>
        <p className="user-post-title">{postData?.post_title.slice(0,screenWidth / 10).trim() + 
          (postData?.post_title.trim().length > screenWidth / 10 ? '...':'')}</p>
      </a>
      <div className="user-post-right">
        <span className="user-post-postdate">{ postData?.post_date.slice(0, 10)}</span>
        <div className="user-post-controls">
          {!props.isAwaiting&&
          <div className="ctrl-edit">
            <button onClick={(e)=>{e.preventDefault();editPost();}}>
              <AiFillEdit />
            </button>
          </div>}
          {(!props.isPublished && !props.isAwaiting)&&
          <div className="ctrl-publish">
            <button onClick={(e)=>{e.preventDefault();publishPostBtn();}}>
              <FiUpload />
            </button>
          </div>}
          {!props.isAwaiting&&
          <div className="ctrl-delete">
            <button onClick={(e)=>{
              e.preventDefault();
              deletePostBtn();
            }}>
              <AiFillDelete />
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default UserPostFrame;
