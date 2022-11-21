import { apiGet } from "./apiUtilities"; 
import axios from "axios";
export async function getCategoryPosts(slug, limit) {
  let posts;
  let res = await apiGet('/api/posts/category/'+slug, {limit:limit})
    .catch(err => {
      console.log(err);
      return [];
    })
  posts = res.data.data;
  return posts;
}

export async function getVideos(limit) {
  let videos;
  let res = await apiGet('/api/posts/videos', {limit:limit})
    .catch(err => {
      console.log(err);
      return [];
    })
  videos = res.data.data;
  return videos;
}

export async function getPostByDate(start, limit){
  let posts;
  let res = await apiGet('/api/posts/latest/'+start +'/'+ limit)
    .catch(err => {
      console.log(err);
      return [];
    })
  posts = res.data.data;
  return posts;
}

export async function getPostByView(start, limit){
  let posts;
  let res = await apiGet('/api/posts/view/'+start +'/'+ limit)
    .catch(err => {
      console.log(err);
      return [];
    })
  posts = res.data.data;
  return posts;
}
/**
 * 
 * @param {*} id 
 * @returns returns an array of posts
 */
export async function getPostsByUser(id, limit=1000){
  let posts;
  let res = await apiGet('/api/posts/user', {uid:id, limit:limit})
    .catch(err => {
      console.log(err);
      return [];
    })
  posts = res.data.data;
  return posts;
}

export async function getCategoryList(limit=99){
  let categories;
  let res = await apiGet('/api/categories', {limit:limit})
    .catch(err => {
      console.log(err);
      return [];
    })
  categories = res.data.data;
  return categories;
}

export async function deletePost(postId){
  const res = await axios.delete(`/api/posts/${postId}`)
    .then((resp)=>{
      if(resp.status === 200){
        return true;
      }
      return false;
    })
    .catch((err)=>{
      console.log(err)
      return false;
    })
  return res;
}

export async function publishPost(postId){
  const res = await axios.put(`/api/posts/${postId}`)
    .then((resp)=>{
      if(resp.status === 200){
        return true;
      }
      return false;
    })
    .catch((err)=>{
      console.log(err)
      return false;
    })
  return res;
}