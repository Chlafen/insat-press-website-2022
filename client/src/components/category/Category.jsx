import React from 'react';
import {MdOutlineArrowRightAlt} from 'react-icons/md'
import { Link } from 'react-router-dom';
import './index.css'

const Category = (props) => {
  //TODO: router here
  
  return (
    <div className="category">
      <div className='category-txt'>
        <span>{props.category}</span>
        {props.isLink ? 
          (
            <Link to={'/category/'+props.category.toLowerCase().replace(/\s+/g, '')} className="category-see-all"> 
              <span>SEE ALL</span>
              <MdOutlineArrowRightAlt/>
            </Link>
          ) : <p></p>}
      </div>
      <div className="category-underline"></div>
    </div>
  );
}

export default Category;
