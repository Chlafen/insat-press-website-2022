import './App.css';
import React from "react";
import Header from './components/header/Header';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/home/Home';
// import OurTeam from './pages/ourTeam/OurTeam';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header displayTop="true"/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            {/* <Route path="/ourTeam">
              <OurTeam/>
            </Route> */}
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
