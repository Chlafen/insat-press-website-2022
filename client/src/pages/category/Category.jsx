import React, { useState, useEffect } from 'react' 
import SectionTitle from '../../components/section-title/SectionTitle'
import SectionPosts from '../../components/section-posts/SectionPosts'
import './index.css'
import InfiniteScroll from 'react-infinite-scroller'
import format  from '../../util/format'
import { apiGet } from '../../util/apiUtilities'



export default function Category(props) {
  const [posts, setPosts] = useState([0, []]);
  const [hasMore, setHasMore] = useState(true);


  const loadFunc = async () => {
    await apiGet(`/api/posts/category/${props.category.category_slug}?page=${posts[0] + 1}&limit=3`)
      .then(res => {
        if(res.data.data.length === 0) {
          setHasMore(false);
        } else {
          setPosts([posts[0]+1, [...posts[1], res.data.data.map(format)]]);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  return (
    <div className="category-page">
      <SectionTitle title={props.category.category_name}/>
      <InfiniteScroll
        // dataLength={posts[0]}
        pageStart={1}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {posts[1].map((post, index) => {
          return (<SectionPosts key={index} sectionData={post} categPage/>)
        })}
      </InfiniteScroll>
    </div>
  )
}
