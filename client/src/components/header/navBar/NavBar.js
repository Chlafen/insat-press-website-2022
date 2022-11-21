import React, {useState, useEffect, useContext} from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { FaAngleDown, } from "react-icons/fa"
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { AuthContext } from '../../../context/authContext';
import { getUserInfo } from '../../../util/apiUtilities'; 
import NavProfile from './navProfile/NavProfile';

export default function NavBar(props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const auth = useContext(AuthContext);

  // Verify user role
  // null if not logged in
  useEffect(()=>{
    if(!auth.currentUser()){
      if(userInfo) setUserInfo(null);
      return;
    }
    getUserInfo().then((info)=>{
      setUserInfo(info);
    })
  }, []);
  const [categories, setCategories] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])

  useEffect(() => {
      const navBar = document.querySelector('.nav-icons');
      function handleClick(){
        const res = !toggleMenu;
        setToggleMenu(res);
      }
      navBar.addEventListener('click', handleClick);

      return () => navBar.removeEventListener('click', handleClick);
  })

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeNavList = (e) => {
    setToggleMenu(false);
  }
  return (
    <div className={`nav-bar ${toggleMenu ? " open-menu" : " close-menu"}`}>
      <div className="filler-for-symmetry"></div>
      <div className="nav-logo">
        <img src={process.env.PUBLIC_URL + "logo.png"}/>
      </div>
      <div className="nav-icons">
        <RiMenuLine className="open-menu-icon"/>
        <RiCloseLine className="close-menu-icon"/> 
      </div>
      <ul className="nav-list">
        <Link className="link-nav" onClick={(e)=>closeNavList(e)} to='/'><li>Home</li></Link>

        {
          userInfo && userInfo.user_type.type_id == 1 ? 
          <Link className="link-nav" onClick={(e)=>closeNavList(e)} to='/admin'><li>Admin</li></Link> :
          <></>
        }

        <Link className="link-nav" onClick={(e)=>closeNavList(e)} to='/ourteam'><li>Our team</li></Link>

        <Link className="link-nav" onClick={(e)=>closeNavList(e)} to='/gallery'><li>Gallery</li></Link>
        <div className="link-nav">
          <li className='dropdown-menu'>
            <div style={{display:'flex','alignItems': 'center'}}>Categories &nbsp;
            <FaAngleDown/>
            </div>
            <ul className="sub-menu">
              {
                categories.map((c, i) => {
                  if(i<10 && width > 800) {
                    return
                  }
                  return (
                    <a className="link-nav" key={i} onClick={(e)=>closeNavList(e)} href={'/category/'+c.category_slug}><li>{c.category_name}</li></a> 
                )})
              }

            </ul>
          </li>
        </div>
        <Link className="link-nav" onClick={(e)=>closeNavList(e)} to='/contact'><li>Contact</li></Link>
        {/* <Link className="link-nav" onClick={(e)=>closeNavList(e)} to='/about'><li>About us</li></Link> */}
        {/*profile*/}
 
      </ul>
      <NavProfile userData={userInfo}/>
    </div>
  )
}
