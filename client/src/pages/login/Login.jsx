import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { MdLogin, MdLock, MdArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import { apiPost } from '../../util/apiUtilities';

export default function Login() {
  const [login, setLogin] = useState({});
  const [error , setError] = useState('');

  const auth = useContext(AuthContext);

  useEffect(()=>{
    if(auth.currentUser()){
      // TODO: Log event: Already logged in.
      window.location.href = '/';
      return;
    }
  }, [])

  const submitLogin = async (e) => {
    e.preventDefault(); 
    console.log("hhh")
    if(login.username === '' || login.password === ''){
      setError('Please fill all the fields');
    }else{
      await apiPost('/api/auth/login', login)
      .then(resp => {
        console.log("hi");
        auth.login({accessToken: resp.data.data.accessToken});
        //window.location.href = '/';
      })
      .catch(errResp => {
        console.log(errResp.response);
        setError(errResp.response.data.message);
      });
    }
  }

  const handleChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

  return (
    <div className="login">
      <img className='login-bgr' src="https://img.wallpapersafari.com/desktop/1920/1080/33/12/sFu1d8.jpg" alt="" />
 
      <div className="grid">
        <form onSubmit={submitLogin}>
          <div className="login-form">
              <img  src={process.env.PUBLIC_URL + "logo.png" }alt="" />
              <div className="form__field">
                <label for="login__username">
                  <MdLogin/>
                  <span className="hidden">Username</span>
                </label>
                <input 
                  autocomplete="username" 
                  id="login__username" 
                  type="text" 
                  name="username" 
                  className="form__input" 
                  placeholder="Username or Email" 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__field">
                <label for="login__password">
                  <MdLock/>
                  <span className="hidden">Password</span>
                </label>
                <input 
                  id="login__password" 
                  type="password" 
                  name="password" 
                  className="form__input" 
                  placeholder="Password" 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__field">
                <input type="submit" value="Sign In"/>
              </div>
          </div>
        </form>

        <p className="text--center">
          Not a member? 
          <Link to="/signup">Sign up now</Link> 
          <MdArrowRight/>
        </p>

      </div>
    </div>

  )
}
