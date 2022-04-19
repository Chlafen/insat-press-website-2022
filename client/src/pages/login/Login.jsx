import React, { useState } from 'react'
import './index.css'
import { MdLogin, MdLock, MdArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Login() {
  const [login, setLogin] = useState({});
  const [error , setError] = useState('');

  const submitLogin = async (e) => {
    e.preventDefault(); 
    if(login.username === '' || login.password === ''){
      setError('Please fill all the fields');
    }else{
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          setError(data.error);
        }else{
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        }
      })
      .catch(err => console.log(err));
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
