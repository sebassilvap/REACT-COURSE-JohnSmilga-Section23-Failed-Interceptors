// NOTE: The previous code by default has been removed!
//import React from 'react';

// ===> Import PAGES!
// import Landing page
//import Landing from './pages/Landing'; // REPLACED BY index.js OF PAGES !!
//import { Landing, Error, Dashboard, Register } from './pages'; // once we remove the dashboard
import { Landing, Error, Register, ProtectedRoute } from './pages';

// import pages of the dashboard
import {
  Profile,
  AddJob,
  AllJobs,
  Stats,
  SharedLayout,
} from './pages/dashboard';

// ===> Import React Router 6
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ===> Toast Container for the alert messages
import { ToastContainer } from 'react-toastify'; // container -> what controls the toast (alerts)
import 'react-toastify/dist/ReactToastify.css'; // the css

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* THE DASHBOARD PAGE */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              {/* the content of dashboard is restricted */}
              {/* we restrict access to all the nested pages */}
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        {/* LANDING - REGISTER/LOGIN PAGE */}
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />

        {/* ERROR PAGE */}
        <Route path='*' element={<Error />} />
      </Routes>

      {/*
       * after the Routes -> toast container
       * modifying css of toast -> position (for more, check documentation)
       */}

      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
};

export default App;
