import { NavLink } from 'react-router-dom';
import links from '../utils/links';

// toggleSidebar as prop
const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        // destructure the properties from the link object in links js file
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            end
            // ({isActive}) : object, and inside an ACTIVE PARAMETER
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
