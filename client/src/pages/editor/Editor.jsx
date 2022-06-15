import './index.css';
import React, { useEffect, useRef, useState } from 'react'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import {EditorState, convertToRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import { DDMMYYYY } from '../../util/utilities';

import UnderLineIcon from './UnderLineIcon.svg'
import BoldIcon from './BoldIcon.svg'
import ItalicIcon from './ItalicIcon.svg'
import {MdAccessAlarm, MdInsertComment} from 'react-icons/md';
import {AiFillEye} from "react-icons/ai"
import {FacebookIcon,LinkedinIcon,RedditIcon,TwitterIcon} from "react-share";

import Category from '../../components/category/Category';
import EditorSide from './editorSide/EditorSide';
import { Redirect, useHistory } from 'react-router-dom';
import { apiPost } from '../../util/apiUtilities';

const iconSize = 32

export default function EditorPage(props) {
  //editor stuff
  const [postState, setPostState] = useState(EditorState.createEmpty())
  const [titleState, setTitleState] = useState(EditorState.createEmpty())
  const [imgState, setImgState] = useState(EditorState.createEmpty())
  const [categoryState, setCategoryState] = useState(EditorState.createEmpty())
  const [previewImgUrl, setPreviewImgUrl] = useState('');
  let ref = useRef();

  let onPostStateChange = (state) => setPostState(state)
  let onCategoryStateChange = (state) => {setCategoryState(state)}
  let onTitleStateChange = (state) => setTitleState(state)
  let onImgStateChange = (state) => {setImgState(state); document.getElementById('post-img-placeholder')?document.getElementById('post-img-placeholder').remove():console.log();}
  
  let cat = document.querySelector('.e-category');
  useEffect(() => {
    if(!cat){
      return
    }else{
      categoryState.getCurrentContent().getPlainText() ?
        cat.style.minWidth = "1rem":
        cat.style.minWidth = "clamp(3.9rem, 3rem + 6.81vw,7rem)"
    }
  },  );

  function triggerInputFile () {
    ref.current.click();
  }


  function getPostData (e) {
    e.preventDefault()
    if(postState.getCurrentContent().getPlainText().length === 0 || titleState.isEmpty || categoryState.isEmpty ){
      return {};
    }
    const postContent = draftToHtml(convertToRaw(postState.getCurrentContent()));
    const title = titleState.getCurrentContent().getPlainText();
    const category = categoryState.getCurrentContent().getPlainText();

    const postData = {
      title: title,
      category: category.toUpperCase(),
      timeOfPost: new Date(),
      author: authorName,//remove
      authorId: authorId,
      img: {
        imgUrl: '/post?pid=',
        alt: 'Post img' //to hardcode or img recg
      },
      views: 158,
      // comments: 15,
      content: postContent, //get desc from here
      id: 1 //generate when inserting to db
    }
    return postData;
    // return postData
  }
  function onPostImgChanged(e) {
    e.preventDefault()
    setPreviewImgUrl(URL.createObjectURL(e.target.files[0]).toString())
  }


  function saveDraft(e) {
    e.preventDefault();
    const postData = getPostData(e);
    
    if(!postData.title || !postData.category || !postData.content ){
      window.alert("Article still incomplete!")
    }else{

      //save image

      //send to server
      
    }

  }
  let history = useHistory();

  function savePublish(e) {
    e.preventDefault();
    const postData = getPostData(e);
    
    if(!postData.title || !postData.category || !postData.content ){
      let msg = 'Article still incomplete!\nPlease insert : \n';
      if(!postData.title){
        msg += 'Title\n'
      }
      if(!postData.category){
        msg += 'Category\n'
      }
      if(!postData.content){
        msg += 'Content\n'
      }
      window.alert(msg)
    }else{
      console.log(postData.content);

      //save image

      //send to server

     // history.push('/')
    }

    
  }

  function cancel(e) {
    e.preventDefault();

  }

  //get author image
  const authorId = 123;
  const authorImgUrl = '/images/post4.jpg'    // get from server
  const authorName = 'Mohamed Amine Bouchnak' // get from server
  const postImage = '/images/post2.jpg'       // tmp
  

  return (
    <form className="editor" method='post' encType='multipart/form-data'>
      <div className="article">
      <div className="p-header">
        <div className="p-category-date">
          <h3 className='e-category'>
          <Editor
            editorState={categoryState}
            onEditorStateChange={onCategoryStateChange}
            placeholder='Insert'
            toolbarClassName='hidden'
            editorClassName='post-title-editor'
            toolbar={{
              options: [],
            }}
          />
          </h3>
          <div className="p-vertical-sep"></div>
          <p className="p-time-posted">{DDMMYYYY(new Date())}</p>
          <div className="p-vertical-sep"></div>
          <MdAccessAlarm/>
          <p className="avg-time-to-read">0 min. read</p>
        </div>
        <h1 className="e-title p-title">
        <Editor
            editorState={titleState}
            onEditorStateChange={onTitleStateChange}
            placeholder='Insert'
            toolbarClassName='hidden'
            editorClassName='post-title-editor'
            toolbar={{
              options: [],
            }}
          />
        </h1>
        <div className="p-author-info">
          <div className="p-author-img">
            <img src={authorImgUrl} alt={authorName} />
          </div>
          <div className="p-author-desc">
            <p>Currently editing</p>
            <span className='p-author-name'>{authorName}</span>
          </div>
        </div>
      </div>
      <div className="p-horizontal-sep"></div>
      <div className="p-image"  >
        <img src={previewImgUrl || "https://via.placeholder.com/1300x700?text=Insert+Post+Image+Here"} id='post-img-placeholder' alt='placeholder' onClick={triggerInputFile} style={{cursor:"pointer"}}/>
        <br /><br />
        <p>Choose Post Image to upload:</p>
        <br />
        <input ref={ref} type="file" name="postImage" accept="image/*" id="postImage" onChange={(e) => {onPostImgChanged(e); console.log(e.target.files)}}/>
        <br />
      </div>
      <div className="p-views-comms">
        <AiFillEye/>
        0
        <div className="vertica-sep-"></div>
        <MdInsertComment/>
        0
      </div>
      <div className="p-horizontal-sep"></div>
      <div className="p-body-mid">
        <div className="post-content">
          <Editor
            editorState={postState}
            onEditorStateChange={onPostStateChange}
            placeholder='Start writing your article here...'
            editorClassName='editor-class'
            toolbar={{
              // we'll add our config here
              options: ['inline', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
              inline: {
                inDropdown: false,
                options: ['bold', 'underline', 'italic'],
                bold: { icon: BoldIcon },
                italic: { icon: ItalicIcon }, 
                underline: { icon: UnderLineIcon },
              },
              image: {
                urlEnabled: false,
                uploadEnabled: true, 
                uploadCallback: uploadCallback, 
                previewImage: true,
                inputAccept: 'image/jpeg,image/jpg,image/png',
                alt: ''
              },
            }}
          />
        </div>
        <div className="p-v-sep toggle-p"></div>

        <div className="p-text-post-list toggle-p">
        </div>
      </div>

      <div className="shar-post">
        <p>Share:</p>
        <div className="icons-scl">
          <TwitterIcon size={iconSize} />
          <FacebookIcon size={iconSize} />
          <RedditIcon size={iconSize} />
          <LinkedinIcon size={iconSize} />
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
      </div>

      </div>
      <EditorSide
        onSave={savePublish}
        onDraft={saveDraft}
        onCancel={cancel}
      />
    </form>
  )
}


async function uploadCallback(file)  {
  const formData = new FormData();
  formData.append('contentImg', file, file.name);
  const uploadedImageUrl = await apiPost("tmp", formData);
  
  return new Promise((resolve) => {
    resolve({
      data: {
        link: uploadedImageUrl.data,
      },
    });
  });
}