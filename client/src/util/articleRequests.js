import { apiGet } from "./apiUtilities";
import format from './format'

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

export async function getPostByDate(limit){
  let posts;
  let res = await apiGet('/api/posts/latest/'+limit)
    .catch(err => {
      console.log(err);
      return [];
    })
  posts = res.data.data;
  return posts;
}