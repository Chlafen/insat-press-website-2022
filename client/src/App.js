import './App.css';
import React, { useState } from "react";
import Header from './components/header/Header';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/home/Home';
// import OurTeam from './pages/ourTeam/OurTeam';
import Footer from './components/footer/Footer';
import Article from './pages/article/Article';
import Error404 from './pages/error404/Error404';
import EditorPage from './pages/editor/Editor';
import OurTeam from './pages/ourteam/OurTeam';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

const categories = [ // from server
  "Uni life",
  "Science",
  "Sports",
  "Stories",
  "Events",
  "Culture",
  "Society"
];

function App() {
  const [headerTransparent, setHeaderTransparent] = useState(window.location.pathname === '/');
  const [headerVisible, setHeaderVisible] = useState(true);
  return (
    <Router>
      <div className="App">
        {headerVisible?<Header displayTop="true" hasBackground = {!headerTransparent}/>:<></>}
        <div className="content">
          <Switch>
            <Route exact path="/"
            render={()=>{
              setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (<Home/>)}}>
            </Route>
            <Route exact path="/ourteam"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (<OurTeam/>)}}>
            </Route>
            <Route exact path="/gallery"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (<p>gallery  </p>)}}>
            </Route>
            <Route exact path="/contact"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (
                  <p>contact</p>)}}>
            </Route>
            <Route exact path="/about"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (<p>about</p>)}}>
            </Route>
            {
              categories.map((c) => {
                return (
                  <Route exact path={'/category/' + c.toLowerCase().replace(/\s+/g, '')}
                    render={()=>{
                      setHeaderTransparent(window.location.pathname === '/');
                      return (<p>{c}</p>)}}>
                  </Route>
                )
              })
            }
            <Route exact path="/post"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (<Article/>)}}>
            </Route>
            <Route exact path="/editor"
            render={()=>{
              setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (<EditorPage/>)}}>
            </Route>
            <Route exact path="/login"
                render={()=>{
                  setHeaderVisible(false);
                  return (<Login/>)}}>
            </Route>
            <Route exact path="/signup"
                render={()=>{
                  setHeaderVisible(false);
                  return (<Signup/>)}}>
            </Route>
            <Route path="*"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
              setHeaderVisible(true);
              return (<Error404/>)}}>
            </Route>
          </Switch>
        </div>
        {headerVisible?<Footer/>:<></>}
      </div>
    </Router>
  );
}

export default App;
