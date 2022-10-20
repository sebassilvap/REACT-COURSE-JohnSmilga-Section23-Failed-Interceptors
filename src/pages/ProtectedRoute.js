// imports
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  // children -> will be the SharedLayout
  const { user } = useSelector((store) => store.user); // get the user from the state

  // if the user doesn't exist -> go to landing page
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoute;
