// import the Wrapper
import Wrapper from '../assets/wrappers/BigSidebar';

// IMPORTANT: by default the BigSidebar is not going to be displayed
// check please BigSidebar Wrapper
// it will be displayed starting from 992px
/*
display: none;
@media (min-width: 992px) {
  display: block;
  ....
}
*/

// rest of imports
import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import { useSelector } from 'react-redux';

// ========================================================================
const BigSidebar = () => {
  // get the state value
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>

          {/* nav links */}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
