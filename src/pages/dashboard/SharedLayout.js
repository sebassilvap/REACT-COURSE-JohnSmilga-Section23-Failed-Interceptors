// get the outlet -> component where we display the content of the pages (stats, etc..)
import { Outlet } from 'react-router-dom';

// get the components for the SharedLayout
import { BigSidebar, Navbar, SmallSidebar } from '../../components';

// import the Wrapper for this page (styled component)
import Wrapper from '../../assets/wrappers/SharedLayout';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* 2 column layout */}
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
