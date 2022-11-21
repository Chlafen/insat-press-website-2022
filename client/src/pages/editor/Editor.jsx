import './index.css';
import React, { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
import { Editor } from "react-draft-wysiwyg";
import {EditorState, convertToRaw} from 'draft-js'
import EditorSide from './editorSide/EditorSide';

import draftToHtml from 'draftjs-to-html'
import { DDMMYYYY } from '../../util/utilities';

import UnderLineIcon from './UnderLineIcon.svg'
import BoldIcon from './BoldIcon.svg'
import ItalicIcon from './ItalicIcon.svg'

import {getUserInfo} from '../../util/apiUtilities';
import {getCategoryList} from '../../util/articleRequests';
import { AuthContext } from '../../context/authContext';


export default function EditorPage(props) {
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [secondaryCategories, setSecondaryCategories] = useState([]);
  const [postState, setPostState] = useState(EditorState.createEmpty())
  const [titleState, setTitleState] = useState(EditorState.createEmpty())
  const [previewImage, setPreviewImage] = useState({file: null, url: null});
  const [attachments, setAttachments] = useState([]);
  const [tags, setTags] = useState([]);
  
  const [categoryList, setCategoryList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const auth = useContext(AuthContext);
  let ref = useRef();

  let onPostStateChange = (state) => setPostState(state)
  let onTitleStateChange = (state) => setTitleState(state)
  

  useEffect(() => {
    getCategoryList()
      .then(cats => {
        let catList = cats.map(cat => ({value: cat.category_slug, label: cat.category_name}))
        setCategoryList(catList)
      })
      .catch(err => console.log(err))
  }, [])

  function triggerInputFile () {
    ref.current.click();
  }
  function getPostData (e) {
    e.preventDefault()
    if(postState.getCurrentContent().getPlainText().length === 0 || titleState.isEmpty || primaryCategory === '') {
      return {};
    }
    const postContent = draftToHtml(convertToRaw(postState.getCurrentContent()));
    const title = titleState.getCurrentContent().getPlainText();
    console.log('current content', postState.getCurrentContent());
    console.log('post content', postContent);
    console.log('title', title);
    console.log("titleState");
    console.log(titleState.getCurrentContent());
    const postData = {
      content: postContent, 
      title: title,
      author_id: userInfo.user_id,
      type: '',
      image_path: '',
      categories: {
        primary: primaryCategory,
        secondary: secondaryCategories
      },
      tags: [],
      attachments: [],
    }
    return postData;
    // return postData
  }
  function onPostImgChanged(e) {
    e.preventDefault()
    setPreviewImage({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]).toString()
    })
  }
  async function uploadCallback(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const uploadedImageUrl = await axios.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(attachments);
    let temp = attachments;
    temp.push({
      mime_type: file.type,
      attachment_path: uploadedImageUrl.data
    });
    console.log(temp);
    setAttachments(temp);
    return new Promise((resolve) => {
      resolve({
        data: {
          link: uploadedImageUrl.data,
        },
      });
    });
  }

  function saveDraft(e) {
    e.preventDefault();
    const postData = getPostData(e);
    
    if(!postData.title || !postData.categories.primary || !postData.content) {
      console.log(postData);
      window.alert("Article still incomplete!")
    }else{
      // upload image
      const formData = new FormData();
      formData.append('file', previewImage.file, previewImage.file.name);
      axios.post('/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(res => {
          postData.image_path = res.data;
          postData.type = 'draft';
          postData.tags = tags;
          postData.attachments = attachments;
          console.log(postData);
          axios.post('/api/posts/drafts', postData)
            .then(res => {
              console.log(res);
              window.location.href = '/profile';
              alert("Draft saved!")
            })
            .catch(err => {
              console.log(err);
              alert("Error uploading article!")
            })
        })
        .catch(err => {
          console.log(err);
          alert("Error uploading post image!")
        });
    }

  }
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
    if(window.confirm('Are you sure you want to cancel?')===true)
      window.location.href = '/profile';
  }

  //get userData
  useEffect(()=>{
    if(!auth.currentUser()){
      window.location.href = '/login';
      return;
    }
    getUserInfo().then((info)=>{
      setUserInfo(info)
    })
  }, [auth]);

  
  

  return (
    <form className="editor" method='post' encType='multipart/form-data'>
      <div className="article">
      <div className="p-header">
        <div className="p-category-date">
          <Select
            className='p-category-select'
            placeholder='Primary Category'
            options={categoryList}
            onChange={(e) => setPrimaryCategory(e.value)}
          />
          <div className="p-vertical-sep"></div>
          <p className="p-time-posted">{DDMMYYYY(new Date())}</p>
        </div>
          <Select
            className='s-category-select'
            placeholder='Secondary Categories'
            isMulti
            options={categoryList}
            onChange={(e) => {setSecondaryCategories(e.map(cat => cat.value))}}
          />
        <h1 className="e-title p-title">
          <Editor
            editorState={titleState}
            onEditorStateChange={onTitleStateChange}
            placeholder='Title'
            toolbarClassName='hidden'
            editorClassName='post-title-editor'
            toolbar={{
              options: [],
            }}
          />
        </h1>
        <div className="p-author-info">
          <div className="p-author-img">
            <img src={userInfo?.profile_pic} alt="" />
          </div>
          <div className="p-author-desc">
            <p>Currently editing</p>
            <span className='p-author-name'>{ userInfo?.first_name + ' ' + userInfo?.last_name }</span>
          </div>
        </div>
      </div>
      <div className="p-horizontal-sep"></div>
      <div className="p-image"  >
        <img 
          src={previewImage?.url || "https://via.placeholder.com/1300x700?text=Insert+Post+Image+Here"} 
          id='post-img-placeholder' 
          alt='placeholder' 
          onClick={triggerInputFile} 
          style={{cursor:"pointer"}}
        />
        <br /><br />
        <p>Choose Post Image to upload:</p>
        <br />
        <input ref={ref} type="file" 
          name="postImage" 
          accept="image/*" 
          id="postImage" 
          onChange={
            (e) => {onPostImgChanged(e)}
          }
        />
        <br />
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
                uploadCallback: (file) => uploadCallback(file, attachments, setAttachments), 
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

      <div className="p-horizontal-sep"></div>

      </div>
      <EditorSide
        onDraft={saveDraft}
        onCancel={cancel}
      />
    </form>
  )
}


