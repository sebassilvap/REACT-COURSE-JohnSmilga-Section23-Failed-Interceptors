// ==> import the Wrapper
import Wrapper from '../assets/wrappers/Navbar';

// ==> import the REACT ICONS
//import { FaHome } from 'react-icons/fa'; // TEST REACT ICONS : fa -> the library
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

// ==> Logo img
import Logo from './Logo';

// ==> useState
import { useState } from 'react';

// ==> useDispatch & useSelector
import { useDispatch, useSelector } from 'react-redux';

// ==> functionality from userSlice
import { toggleSidebar, logoutUser } from '../features/user/userSlice';

// ==================================================================================
const Navbar = () => {
  const { user } = useSelector((store) => store.user); // grab the user
  const dispatch = useDispatch();

  // state variable for toggling logout button
  const [showLogout, setShowLogout] = useState(false);

  // **** toggle functionality
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        {/* TOGGLE SIDEBAR BUTTON */}
        <button
          type='button'
          className='toggle-btn'
          //onClick={() => console.log('toggle sidebar')} // TEST
          onClick={toggle} // with the functionality of toggle
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        {/* BUTTON CONTAINER WITH DROPDOWN */}
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            //onClick={() => console.log('toggle logout dropdown')} // TEST
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {/* access the user */}
            {user?.name}
            <FaCaretDown />
          </button>

          {/* BUTTON TO LOGOUT THE USER */}
          <div
            //className='dropdown show-dropdown' // INITIALLY
            className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}
          >
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => {
                //console.log('logout user'); // now we use the functionality of logout user
                dispatch(logoutUser('Loggin out.... 😢'));
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
