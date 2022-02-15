import React from 'react';
import './index.css'

const WidePostFrame = (props) => {
  return (
    <div className='wide-post-container'>
      <div className='wide-post-img'>
        <img alt={props.post.img.alt} src={props.post.img.imgurl} />
      </div>
      <div className='wide-post-info'>
        <div className='wide-post-title'>
          {props.post.title}
        </div>
        <div className='wide-post-desc'>
        {(()=>{
          let len=100;
          if(window.innerWidth < 620) len = 100;
          return props.post.description.length >  len ? props.post.description.slice(0, len) + "...": props.post.description;
        })()}
        </div>
        <div className='wide-post-postby'>
          <div className='wide-post-time'>8 hours ago by&nbsp;</div><div className='wide-post-auth'>{props.post.author}</div>
        </div>
        <div className='wide-post-stats'>
          <div className='wide-post-stats-icon'>
            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4211 0.894531C5.68421 0.894531 1.63895 3.84085 0 7.99979C1.63895 12.1587 5.68421 15.1051 10.4211 15.1051C15.1579 15.1051 19.2032 12.1587 20.8421 7.99979C19.2032 3.84085 15.1579 0.894531 10.4211 0.894531ZM10.4211 12.7366C7.80632 12.7366 5.68421 10.6145 5.68421 7.99979C5.68421 5.38506 7.80632 3.26295 10.4211 3.26295C13.0358 3.26295 15.1579 5.38506 15.1579 7.99979C15.1579 10.6145 13.0358 12.7366 10.4211 12.7366ZM10.4211 5.15769C8.84842 5.15769 7.57895 6.42716 7.57895 7.99979C7.57895 9.57243 8.84842 10.8419 10.4211 10.8419C11.9937 10.8419 13.2632 9.57243 13.2632 7.99979C13.2632 6.42716 11.9937 5.15769 10.4211 5.15769Z" fill="#7A7A7A"/>
            </svg>
            {props.post.views}
          </div>
          <div className='wide-post-stats-icon'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2525 0.105469H1.62094C0.752518 0.105469 0.0419922 0.815995 0.0419922 1.68442V11.1581C0.0419922 12.0265 0.752518 12.737 1.62094 12.737H12.6736L15.8315 15.8949V1.68442C15.8315 0.815995 15.1209 0.105469 14.2525 0.105469ZM12.6736 9.57915H3.19989V8.00021H12.6736V9.57915ZM12.6736 7.21073H3.19989V5.63178H12.6736V7.21073ZM12.6736 4.84231H3.19989V3.26336H12.6736V4.84231Z" fill="#7A7A7A"/>
            </svg>
            {props.post.comments}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WidePostFrame;
