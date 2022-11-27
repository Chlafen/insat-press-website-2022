
import { timeSince, DDMMYYYY, convertSqlDateToJsDate, capitalize, getAvgTimeToRead} from './utilities'

import parse from 'html-react-parser';

export default function format(post) {
  if(!post) return null;
  const stringDate = DDMMYYYY(convertSqlDateToJsDate(post.post_date)) 
  return {
    post_id: post.post_id,
    category: post.categories[0].category_name,
    createdAt: timeSince(new Date(stringDate)),
    title: post.post_title || parse(post.post_content)[0],
    author_name: capitalize(post.user.first_name + ' ' + post.user.last_name),
    profile_pic: post.user.profile_pic,
    author_username: post.user.username,
    image_path: post.image_path,
    blurhash: post.blurhash,
    view_count: post.view_count, 
    content: '',
  }
}
export function textContent(elem){ 
  if (!elem) {
    return '';
  }
  if (typeof elem === 'string') {
    return elem;
  }
  const children = elem.props && elem.props.children;
  if (children instanceof Array) {
    return children.map(textContent).join('');
  }
  return textContent(children);
}

export function formatNumber(n){
  //return k m or b depending on the size of the number
  if(n < 1000) return n;
  if(n < 1000000) return (n/1000).toFixed(1) + 'K';
  if(n < 1000000000) return (n/1000000).toFixed(1) + 'M';
  

}