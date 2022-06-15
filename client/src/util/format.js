
import { timeSince, DDMMYYYY, convertSqlDateToJsDate, capitalize, getAvgTimeToRead} from './utilities'

import parse from 'html-react-parser';

export default function format(post) {
  const stringDate = DDMMYYYY(convertSqlDateToJsDate(post.post_date))
  console.log((new Date(stringDate)))
  console.log(stringDate)
  return {
    post_id: post.post_id,
    category: post.categories[0].category_name,
    createdAt: timeSince(new Date(stringDate)),
    title: post.post_title,
    author_name: capitalize(post.user.first_name + ' ' + post.user.last_name),
    profile_pic: post.user.profile_pic,
    author_username: post.user.username,
    image_path: post.image_path,
    view_count: post.view_count, 
    content: ' ez ez',
  }
}