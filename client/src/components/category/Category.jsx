import React from 'react';
import {MdOutlineArrowRightAlt} from 'react-icons/md'
import './index.css'

const Category = (props) => {
  //TODO: router here
  return (
    <div className="category">
      <div className='category-txt'>
        <span>{props.category}</span>
        <a href='/' className="category-see-all"> 
          <span>SEE ALL</span>
          <MdOutlineArrowRightAlt/>
        </a>
      </div>
      <div className="category-underline"></div>
    </div>
  );
}

export default Category;
