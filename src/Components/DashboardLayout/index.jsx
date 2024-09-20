import {  useState } from 'react';
import PropTypes from 'prop-types';
import Nav from '../sidebar/sidebar';
import Header from '../header';
import { Outlet } from 'react-router';


export default function DashboardLayout() {
  const [openNav, setOpenNav] = useState(false);


  return (
<>
  <Header onOpenNav={() => setOpenNav(true)} />

  <div className="flex flex-col md:flex-row items-start custom-direction">
    <div className="flex-none w-full md:w-1/5 ">
      <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
    </div>

    <div className="flex-1 w-full md:w-3/4 mx-auto s">
      <div style={{ marginTop: '96px' }}>
        <Outlet sx={{ marginRight: 0 }} /> {/* Set marginRight to 0 */}
      </div>
    </div>
  </div>
</>

  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
