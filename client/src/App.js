import './App.css';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import LayoutHeader from './components/header/LayoutHeader';
import LayoutFooter from './components/footer/LayoutFooter.jsx';

import { AuthContainer } from './context/authContext';
import { apiGet } from './util/apiUtilities';

import pageRoutes from './config/routes';
import Category from './pages/category/Category';


const getCategories = async () => {
  const res = await apiGet('/api/categories');
  console.log("categories");
  console.log(res)
  return new Promise((resolve) => {
    resolve(
      res.data
    );
  });
};

function App() {
  const [categories, setCategories] = useState([]);
  const hideHeaderPaths = ['/login', '/logout', '/signup', '/admin'];

  useEffect(() => {
    getCategories().then(res => {
      const cats = res.data; 
      setCategories(cats);
    });
  }, [])

  return (
    <AuthContainer>
      <Router>
        <div className="App">
          <div className={"content " + ("hideHeaderPaths.includes(useLocation().pathname)" ? "margin-header" : "")}>
            <Routes>
              <Route element={ <LayoutHeader hideHeaderPaths={hideHeaderPaths} categories={categories}/> } >
                <Route element={ <LayoutFooter hideFooterPaths={hideHeaderPaths}/> } >
                  {
                    pageRoutes.map((route, index) => 
                      <Route key={index} exact path={route.path} element={route.element} />
                    )
                  }
                  {
                    categories.map((category, index) =>
                      <Route key={index} exact path={`/category/${category.category_slug}`} element={<Category  category={category}/>} />
                    )
                  }
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContainer>
  );
}

export default App;
