import React, {useState, useEffect} from 'react';
import './index.css';
import NavButton from './navButton/NavButton';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaAngleDown, } from "react-icons/fa"
import { RiMenuLine, RiCloseLine } from "react-icons/ri";


export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
      const navBar = document.querySelector('.nav-icons');
      function handleClick(){
        const res = !toggleMenu;
        setToggleMenu(res);
      }
      navBar.addEventListener('click', handleClick);

      return () => navBar.removeEventListener('click', handleClick);
  })

  return (
    <div className={`nav-bar ${toggleMenu ? " open-menu" : " close-menu"}`}>
      <div className="nav-logo">
        <img src={process.env.PUBLIC_URL + "images/logo.png"}/>
      </div>
      <div className="nav-icons">
        <RiMenuLine className="open-menu-icon"/>
        <RiCloseLine className="close-menu-icon"/> 
      </div>
      <ul className="nav-list">
        <Link className="link-nav" to='/'><li>Home</li></Link>
      
        <Link className="link-nav" to='/'><li>Our team</li></Link>

        <Link className="link-nav" to='/'><li>Gallery</li></Link>
        <Link className="link-nav" to='/'>
          <li className='dropdown-menu'>
            <div style={{display:'flex','align-items': 'center'}}>Categories &nbsp;
            <FaAngleDown/>
            </div>
            <ul className="sub-menu">

              <Link className="link-nav" to='/'><li>Uni life</li></Link>

              <Link className="link-nav" to='/'><li>News</li></Link> 

              <Link className="link-nav" to='/'><li>Science</li></Link> 

              <Link className="link-nav" to='/'><li>Stories</li></Link> 

            </ul>
          </li>
        </Link>
        <Link className="link-nav" to='/'><li>Contact</li></Link>
        <Link className="link-nav" to='/'><li>About us</li></Link>
        {/*profile*/}
        {/* <li>

        </li> */}
      </ul>
    </div>
  )
}
