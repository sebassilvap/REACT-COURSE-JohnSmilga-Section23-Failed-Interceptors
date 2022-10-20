// index.js for the pages
// here I import all the pages
// and export index.js where I need my pages!

//import Dashboard from './Dashboard';
import Error from './Error';
import Landing from './Landing';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

//export { Landing, Error, Dashboard, Register }; // dashboard structure is now in a folder
export { Landing, Error, Register, ProtectedRoute };
