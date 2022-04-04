import './App.css';
import React, { useEffect, useState } from "react";
import Header from './components/header/Header';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/home/Home';
// import OurTeam from './pages/ourTeam/OurTeam';
import Footer from './components/footer/Footer';
import Article from './pages/article/Article';
import Error404 from './pages/error404/Error404';
import EditorPage from './pages/editor/Editor';

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
  const [headerTransparent, setHeaderTransparent] = useState(window.location.pathname === '/')
  return (
    <Router>
      <div className="App">
        <Header displayTop="true" hasBackground = {!headerTransparent}/>
        <div className="content">
          <Switch>
            <Route exact path="/"
            render={()=>{
              setHeaderTransparent(window.location.pathname === '/');
              return (<Home/>)}}>
            </Route>
            <Route exact path="/ourteam"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
                return (<p>ourteam</p>)}}>
            </Route>
            <Route exact path="/gallery"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
                return (<p>gallery  </p>)}}>
            </Route>
            <Route exact path="/contact"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
                return (
                  <p>contact</p>)}}>
            </Route>
            <Route exact path="/about"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
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
                return (<Article/>)}}>
            </Route>
            <Route exact path="/editor"
            render={()=>{
              setHeaderTransparent(window.location.pathname === '/');
              return (<EditorPage/>)}}>
            </Route>
            <Route path="*"
              render={()=>{
                setHeaderTransparent(window.location.pathname === '/');
                return (<Error404/>)}}>
            </Route>
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
