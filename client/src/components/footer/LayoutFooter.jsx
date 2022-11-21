import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';


const LayoutFooter = ({ hideFooterPaths = []}) => {
  const { pathname } = useLocation();
  return (
    <>
      {!hideFooterPaths.includes(pathname) && <Footer />}
      <Outlet />
    </>
  );
}

export default LayoutFooter;