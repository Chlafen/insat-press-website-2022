import React from 'react';
import './index.css';

const Testpostframe = (props) => {
  return (
    <a href={"/post?pid="+props.postData.post_id} className={`test-post-frame ${props.white && "text-white"}`}>
      <div className="test-post-category">
        <div className="test-post-category-circle"></div>
        <p>{props.postData.category}</p>
      </div>
      <h3 className="test-post-title">{props.postData.title}</h3>
      <div className="test-post-time-auth">
        <span className="post-time-since">
          {props.postData.createdAt + ' ago by'} &nbsp;
        </span>
        <span className="post-author">
          {props.postData.author_name}
        </span>
      </div>
    </a>
  );
}

export default Testpostframe;
