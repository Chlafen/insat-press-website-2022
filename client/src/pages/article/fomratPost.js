import parse from 'html-react-parser';
import { convertSqlDateToJsDate, DDMMYYYY, getAvgTimeToRead, capitalize} from '../../util/utilities';

const getPrimaryCategory =  function(data){
  if(data.categories.length > 0){
    const categories = data.categories;
    const primaryCategory = categories.find(category => category.post_categories.type === 'primary');
    const secondaryCategories = categories.filter(category => category.post_categories.type === 'secondary');
    return [primaryCategory, secondaryCategories];
  }else  return '';
} 

export function formatPost(post) {
  return {
    category: getPrimaryCategory(post)[0].category_name,
    createdAt: DDMMYYYY(convertSqlDateToJsDate(post.post_date)),
    title: post.post_title,
    author_name: capitalize(post.user.first_name + ' ' + post.user.last_name),
    profile_pic: post.user.profile_pic,
    author_username: post.user.username,
    image_path: post.image_path,
    view_count: post.view_count,
    avg: getAvgTimeToRead(post.post_content),
    content: parse(post.post_content),
  }
}