import React, {useState, useEffect} from 'react';
import './index.css';
import TopPost from './top-post/TopPost'
import HeadPosts from './head-posts/HeadPosts';
import SliderStories from './slider-stories/SliderStories';
import Section3 from './section-3/Section3';
import SectionTitle from '../../components/section-title/SectionTitle';
import Category from '../../components/category/Category';
import SectionPosts from '../../components/section-posts/SectionPosts';
import {apiGet} from '../../util/apiUtilities';
import format from '../../util/format';
import { getCategoryPosts } from '../../util/articleRequests';


const categNumber = 5;



const Home = () => {
  const [categories, setCategories] = useState([]);
  //get categories
  useEffect(() => {
    apiGet('/api/categories', {limit:categNumber})
      .then(res => {
        let catList = []
        res.data.data.forEach(cat => {
          catList.push({name:cat.category_name, slug:cat.category_slug})
        });
        setCategories(catList);
      })
      .catch(err => {
        console.log(err);
      }
      )
  }, []);

  //get categories posts
  const [categoriesPosts, setCategoriesPosts] = useState([]);

  let jsxelt = [];
  useEffect(() => {
    if(categoriesPosts.length === categNumber) return
    categories.reverse()
    categories.forEach((cat, i) => {
      getCategoryPosts(cat.slug, 3)
        .then(posts => {
          let catPosts = []
          catPosts = posts.map(post => {
            return format(post)
          });
          return catPosts;
        })
        .then(catPosts => {
          jsxelt.push(
            <div key={i}>
              <Category isLink={true} category={cat} />
              <SectionPosts sectionData={ catPosts } />
            </div>);
          setCategoriesPosts([...categoriesPosts, ...jsxelt]);
        })
        .catch(err => {
          console.log(err);
        })
    })
  }, [categories]);


  return (
    <div className="home">
      <TopPost  />
      <HeadPosts/>
     
      <SliderStories/>
      <Section3/>
      <SectionTitle title='CATEGORIES'/>
      <>{categoriesPosts}</>
      <div className='invisible-v-spacer'></div>
    </div>
  );
}

export default Home;
