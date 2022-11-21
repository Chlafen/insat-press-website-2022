import React from 'react';
import './index.css';


export default function Footer() {
  return (
    <footer className='footer'>
      {/* <div onClick={()=>{window.scroll({top: 0, left: 0, behavior: 'smooth' })}} className="logo-footer">
        <img src={process.env.PUBLIC_URL + '/logo.png' } alt="" />
      </div> */}
      {/* <div className="footer-sep"></div> */}
      <div className="contact-footer">
        <span>CONTACT:</span>
        <p>insat.press@gmail.com</p>
      </div>
      <div className="footer-sep"></div>
      <p>Made with love at INSAT - Copyrights © 2021, Insat Press</p>
    </footer>
  )
}
