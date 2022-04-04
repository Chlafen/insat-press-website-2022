import React, {useState, useEffect}from 'react'
import './index.css';
import TopHeader from './topHeader/TopHeader';
import NavBar from './navBar/NavBar';

const navScrollDistance = 200;//the distance in px after whitch the top-header disapears 

function Header(props) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(props.displayTop==="true");

  useEffect(() => {
    if(props.displayTop==="false")
      return; 
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  });
  
  //scroll logic to remove header top
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < navScrollDistance);
    setPrevScrollPos(currentScrollPos);
  }

  useEffect(() => {
    if(props.displayTop==="false")
      return;
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className='header' >
      {props.hasBackground?
        <div className='bgr-header-c'>
          <img className="bgr-header" src={`${process.env.PUBLIC_URL}/banner.png`}/>
        </div>
        :<></>
      }
      <div className='wrapper-header'>
        {(screenWidth>800 && visible) &&<TopHeader/>}
        <hr/>
        <NavBar/>
        <hr/>
      </div>
    </div>
  );   
}


export default Header;