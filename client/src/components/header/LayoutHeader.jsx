import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';


const LayoutHeader = ({ hideHeaderPaths = [], displayTop=true, categories}) => {
  const { pathname } = useLocation();
  return (
    <>
      {!hideHeaderPaths.includes(pathname) && <Header displayTop={displayTop} hasBackground={ pathname!=='/' } categories={categories} />}
      <Outlet />
    </>
  );
}

export default LayoutHeader;