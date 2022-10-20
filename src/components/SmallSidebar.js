// **** import the Wrapper
import Wrapper from '../assets/wrappers/SmallSidebar';

// by default SmallSidebar is displayed
// once we get to 992px -> not displayed anymore
// check please the Wrapper for SmallSidebar

/*
@media (min-width: 992px) {
  display: none;
}
*/

// **** import icons
import { FaTimes } from 'react-icons/fa';

// **** import the logo
import Logo from './Logo';

// **** from redux: useSelector & useDispatch
import { useSelector, useDispatch } from 'react-redux';

// **** import functionality from userSlice
import { toggleSidebar } from '../features/user/userSlice';

// **** from React Router to navigate into pages
//import { NavLink } from 'react-router-dom'; // BECAUSE OF NavLinks Component

// **** import the links from the js file created
//import links from '../utils/links'; // BECAUSE OF NavLinks Component

// **** import NavLinks component
import NavLinks from './NavLinks';

// ==================================================================================

const SmallSidebar = () => {
  // grab the state value
  const { isSidebarOpen } = useSelector((store) => store.user);
  // invoke useDispatch
  const dispatch = useDispatch();

  // toggle functionality
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  // RETURN
  return (
    <Wrapper>
      {/* <div className='sidebar-container show-sidebar'> */}
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          {/* close X button */}
          {/* by default when we have big screen -> it will be hidden! */}
          {/* <button className='close-btn' onClick={() => console.log('toggle')}> */}
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>

          {/* logo of jobster */}
          <header>
            <Logo />
          </header>

          {/* the links */}
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
