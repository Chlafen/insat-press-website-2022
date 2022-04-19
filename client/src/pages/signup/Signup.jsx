import React, {useState} from 'react'
import axios from 'axios';
import './index.css'
import { MdLogin, MdLock, MdArrowRight, MdMail } from 'react-icons/md';
import { AiFillTag } from 'react-icons/ai';
import {RiErrorWarningFill} from 'react-icons/ri';
import { Link } from 'react-router-dom'
import {validateEmail} from '../../util/utilities'
 
export default function Signup() {
  const [user,setUser] = useState({
    fname:"",
    lname:"",
    username:"",
    email:"",
    password: "",
    rpassword: ""
  });
  const [error,setError] = useState([]);

  const register = async (e) => {
    e.preventDefault(); 
    let newErr = [];
    if(user.fname === "" || user.lname === "" || user.username === "" || user.email === "" || user.password === ""){
      newErr = ["All fields are required!"];
    }else{
      if(user.password !== user.rpassword){
        newErr = [...newErr, "Passwords do not match!"] ;
      }
      if(!validateEmail(user.email)){
        newErr = [...newErr, "Invalid email!"];
      }
      if(user.username.indexOf(" ") >= 0){
        newErr = [...newErr, "Username cannot contain spaces!"];
      }
      if(newErr.length == 0){
        console.log("Registering user...");
        await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user) 
        })
          .then( res => res.json())
          .then( res => {
            res = JSON.stringify(res);  
            res = JSON.parse(res);
            if(res.code === 200){
              alert("Successfully registered!");
              window.location.href = "/login";
            }else{
              newErr = [res.message];
              setError([...newErr]);
            }  
          })
          .catch((err)=>{
            newErr = [...newErr, "Something went wrong!"];
            setError([...newErr]);
            return;
          });
      }
    }
    setError([...newErr]);
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
        

  return (
    <div className="signup">
      <img className='signup-bgr' src="https://img.wallpapersafari.com/desktop/1920/1080/33/12/sFu1d8.jpg" alt="bgr" />
      <div className="grid">
        <form onSubmit={register}>
          <div className="signup-form">
              <img  src={process.env.PUBLIC_URL + "logo.png" }alt="" />
              <div className="form__field">
                <label htmlFor="signup__fname">
                  <AiFillTag/>
                  <span className="hidden">FirstName</span>
                </label>
                <input 
                  autoComplete="firstname" 
                  id="signup__fname" 
                  type="text" 
                  name="fname" 
                  className="form__input" 
                  placeholder="First Name" 
                  onChange={handleChange} 
                  pattern=".{3,}"
                  title='Minimum 3 characters'
                  required/>
              </div>
              <div className="form__field">
                <label htmlFor="signup__lname">
                  <AiFillTag/>
                  <span className="hidden">Last Name</span></label>
                <input 
                autoComplete="lastname" 
                id="signup__lname" 
                type="text" 
                name="lname" 
                className="form__input" 
                placeholder="Last Name" 
                onChange={handleChange}
                pattern=".{3,}"
                title='Minimum 3 characters'
                required/>
              </div>
              <div className="form__field">
                <label htmlFor="signup__username">
                  <MdLogin/>
                  <span className="hidden">Username</span></label>
                <input 
                autoComplete="username" 
                id="signup__username" 
                type="text" 
                name="username" 
                className="form__input" 
                placeholder="Username" 
                onChange={handleChange}
                required/>
              </div>
              <div className="form__field">
                <label htmlFor="signup__email">
                  <MdMail/>
                  <span className="hidden">Email</span></label>
                <input 
                autoComplete="email" 
                id="signup__email" 
                type="email" 
                name="email" 
                className="form__input" 
                placeholder="E-mail" 
                onChange={handleChange}
                required/>
              </div>
              <div className="form__field">
                <label htmlFor="signup__password">
                  <MdLock/>
                  <span className="hidden">Password</span></label>
                <input 
                  id="signup__password" 
                  type="password" name="password" 
                  className="form__input" 
                  pattern="(?=.*\d)(?=.*[\W_]).{7,}" 
                  title="Minimum of 7 characters. Should have at least one special character and one number." 
                  placeholder="Password" required
                  onChange={handleChange}
                />
              </div>
              <div className="form__field">
                <label htmlFor="signup__rpassword">
                  <MdLock/>
                  <span className="hidden">Confirm Password</span></label>
                <input 
                  id="signup__rpassword" 
                  type="password" name="rpassword" 
                  className="form__input" 
                  pattern="(?=.*\d)(?=.*[\W_]).{7,}" 
                  title="Minimum of 7 characters. Should have at least one special character and one number." 
                  placeholder="Re-enter Password" required
                  onChange={handleChange}
                />
              </div>
              <div className="form__field">
                <input type="submit" />
              </div>
          </div>
        </form>
        <p className={'signup-error ' +( !error?'hidden-err':'')}>
          {
            error?error.map((e)=>{
              return(
                <><span><RiErrorWarningFill color='be2623'/>{e}</span><br/></>
              )
            }):''
          }
        </p>
        <p className="text--center">
          Already a member?
          <Link to="/login">Sign in
          <MdArrowRight/>
          </Link> 
        </p>

      </div>
    </div>

  )
}
