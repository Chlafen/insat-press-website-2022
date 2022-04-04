import React from 'react';
import './index.css';
import TopPost from './top-post/TopPost'
import HeadPosts from './head-posts/HeadPosts';
import SliderStories from './slider-stories/SliderStories';
import Section3 from './section-3/Section3';
import SectionTitle from '../../components/section-title/SectionTitle';
import Category from '../../components/category/Category';
import SectionPosts from '../../components/section-posts/SectionPosts';

const postData = {
  title: 'Project Axis, a new axis newly created by IEEE INSAT',
  category: 'Football',
  timeOfPost: new Date(),
  author: 'Nessrine Baltouni',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    imgUrl: 'images/post3.jpg',
    alt: 'A picture'
  },
  views: 158,
  comments: 15,
  url: '/'
}



const Home = () => {

  const nbOfCats = 4;
  const categPosts = [postData, postData, postData, postData];
  const categories = ['Science', 'Culture', 'Sports', 'Uni life'];

  return (
    <div className="home">
      <TopPost postData={postData}/>
      <HeadPosts postData={postData}/>
      <SliderStories/>
      <Section3 postData={postData}/>

      <SectionTitle title='CATEGORIES'/>

      <Category isLink={true} category={categories[0]}/>
      <SectionPosts postData={categPosts}/>

      <Category isLink={true} category={categories[1]}/>
      <SectionPosts postData={categPosts}/>

      <Category isLink={true} category={categories[2]}/>
      <SectionPosts postData={categPosts}/>

      <Category isLink={true} category={categories[3]}/>
      <SectionPosts postData={categPosts}/>
      <div className='invisible-v-spacer'></div>

      <div id="fb-root"></div>
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0" nonce="bTsJERE5"></script>
      <div className="fb-comments" data-href="http://localhost:3000/" data-width="" data-numposts="4"></div>
    </div>
  );
}

export default Home;
