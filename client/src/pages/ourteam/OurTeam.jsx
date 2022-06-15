import React, { useEffect, useState } from 'react'
import './index.css'
import SectionTitle from '../../components/section-title/SectionTitle';
import Card from './card/Card';
import axios from 'axios';

const User = {
  user_id : 1,
  user_title: 'Story teller',
  user_photo: '/uploads/image/users/user_1.jpg',
  display_name: 'Mohamed Amine Bouchnak',
  post_views: '1.2k',
  post_number: '55',
}


export default function OurTeam() {
  const [ , setAuthors] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [webmasters, setWebmasters] = useState([]); 
  
  //get list of team from server
  useEffect(() => {
     axios.get('/api/users/team/authors?limit=10')
      .then(res => {authors.push(...res.data.data)})
      .catch(err => console.log(err));
     axios.get('/api/users/team/photographers?limit=10')
      .then(res => {photographers.push(...res.data.data)})
      .catch(err => console.log(err));
     axios.get('/api/users/team/webmasters?limit=10')
      .then(res => {webmasters.push(...res.data.data)})
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="our-team"> 
      <div className="our-team-header">
        <p>Meet our amazing team, without them we wouldn't have such great works </p>
        <div className="quote">
          <svg  width="219" height="169" viewBox="0 0 219 169" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.4435 154.432C6.79231 140.914 0 125.752 0 101.175C0 57.9273 30.1785 19.1649 74.0645 0L85.0329 17.0273C44.0702 39.3184 36.0619 68.245 32.8684 86.4832C39.4642 83.0481 48.0989 81.8495 56.5617 82.6403C78.7196 84.7039 96.1856 103.004 96.1856 125.752C96.1856 137.222 91.6564 148.222 83.5943 156.333C75.5322 164.444 64.5977 169 53.1962 169C40.0169 169 27.4149 162.945 19.4435 154.432ZM142.27 154.432C129.619 140.914 122.827 125.752 122.827 101.175C122.827 57.9273 153.005 19.1649 196.891 0L207.86 17.0273C166.897 39.3184 158.889 68.245 155.695 86.4832C162.291 83.0481 170.926 81.8495 179.388 82.6403C201.546 84.7039 219 103.004 219 125.752C219 137.222 214.471 148.222 206.409 156.333C198.347 164.444 187.412 169 176.011 169C162.831 169 150.229 162.945 142.258 154.432H142.27Z" fill="#F3F2ED"/>
          </svg>
        </div>
      </div>  
      <div className="our-team-body">
        <div className="our-team-authors our-team-scn">
          <SectionTitle title="AUTHORS"/>
          <div className="list-team">
            <div className="box-toright">
              <span>TOP</span><span> AUTHORS</span>
            </div>
            {authors.map((user, index) => <Card key={index} ranking={index+1} user={user}/> )}
            
          </div>
        </div>
        <div className="our-team-photographers our-team-scn">
          <SectionTitle title="PHOTOGRAPHERS"/>
          <div className="list-team">
            <div className="box-toleft">
              <span>TOP</span><span> PHOT</span><span> GRAPHERS</span>
            </div>
            {photographers.map((user, index) => <Card right='bdr-right' key={index} ranking={index+1} user={user}/> )}
            
          </div>
        </div>
        <div className="our-team-webmaster our-team-scn">
          <SectionTitle title="WEBMASTERS"/>
          <div className="list-team">
            <div className="box-toright">
              <span>BEST OF</span><span> THE BEST</span>
            </div>
            {webmasters.map((user, index) => <Card key={index} ranking={ 1} user={user}/> )}
            
          </div>
        </div>
      </div>
    </div>
  )
}
