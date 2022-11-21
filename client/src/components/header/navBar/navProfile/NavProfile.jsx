import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './index.css';



const NavProfile = (props) => {
  const [userData, setUserData] =  useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(()=>{
    if(props.userData){
      setUserData(props.userData);
      setIsLogged(true);
    }
  },[props.userData]);


  return isLogged?(
    <div className="user-profile-container">
      <div className="user-display-name">
        <Link to="/profile">{ capitalize(userData.first_name +' '+ userData.last_name) }</Link>
      </div>
      <Link to="/profile" className="link-profile">
        <div className="user-profile">
          <img className='user-picture' src={userData.profile_pic} alt="" />
        </div>
      </Link>
    </div>
  ):<div className="user-profile-container"></div>;
}

const capitalize = (str) => {
  if(!str) return ''; 
  return str.split(' ').map((word)=>{
    if(word.length > 0)
    return word[0].toUpperCase() + word.slice(1);
  }
  ).join(' ');
}

export default NavProfile;
