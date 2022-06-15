import React, {useState, useEffect, useContext} from 'react';
import './index.css';
import NavButton from './navButton/NavButton';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaAngleDown, } from "react-icons/fa"
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { AuthContext } from '../../../context/authContext';
import { getUserInfo } from '../../../util/apiUtilities';


const categories = [
  "Uni life",
  "Science",
  "Sports",
  "Stories",
  "Events",
  "Culture",
  "Society"
];

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const auth = useContext(AuthContext);

  // Verify user role
  // null if not logged in
  useEffect(()=>{
    if(!auth.currentUser()){
      console.log("not logged in")
      if(userInfo) setUserInfo(null);
      return;
    }
    getUserInfo().then((info)=>{
      console.log("user info");
      console.log(info);
      setUserInfo(info);
    })
  }, []);

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
      
        <Link className="link-nav" to='/ourteam'><li>Our team</li></Link>

        <Link className="link-nav" to='/gallery'><li>Gallery</li></Link>
        <div className="link-nav">
          <li className='dropdown-menu'>
            <div style={{display:'flex','alignItems': 'center'}}>Categories &nbsp;
            <FaAngleDown/>
            </div>
            <ul className="sub-menu">
              {
                categories.map((c) => {
                  return (
                    <Link className="link-nav" to={'/category/'+c.toLowerCase().replace(/\s+/g, '')}><li>{c}</li></Link> 
                )})
              }

            </ul>
          </li>
        </div>
        <Link className="link-nav" to='/contact'><li>Contact</li></Link>
        <Link className="link-nav" to='/about'><li>About us</li></Link>
        {/*profile*/}
        {/* <li>

        </li> */}
      </ul>
    </div>
  )
}
