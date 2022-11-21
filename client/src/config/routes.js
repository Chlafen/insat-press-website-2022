import pages from '../pages'

//missing categories routes (they are in App.js)
const pageRoutes = [
  { path: '/',         element: <pages.Home/>       },
  { path: '/admin',    element: <pages.AdminPanel/> },
  { path: '/ourteam',  element: <pages.OurTeam/>    },
  { path: '/gallery',  element: <pages.Gallery/>    },
  { path: '/contact',  element: <pages.Contact/>    },
  { path: '/post',     element: <pages.Article/>    },
  { path: '/editor',   element: <pages.EditorPage/> },
  { path: '/about',    element: <pages.About/>      },
  { path: '/error404', element: <pages.Error404/>   },
  { path: '/login',    element: <pages.Login/>      },
  { path: '/profile',  element: <pages.Profile/>    },   
  { path: '/signup',   element: <pages.Signup/>     },
  { path: '/video',    element: <pages.Video/>      },
  { path: '/user',     element: <pages.UserPublic/> },
  { path: '*',         element: <pages.Error404/>   },
];

export default pageRoutes













