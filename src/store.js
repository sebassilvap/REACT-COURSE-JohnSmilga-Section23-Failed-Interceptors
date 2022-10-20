// import configureStore
import { configureStore } from '@reduxjs/toolkit';

// import userSlice
import userSlice from './features/user/userSlice';

// import jobSlice
import jobSlice from './features/job/jobSlice';

// import allJobsSlice
import allJobsSlice from './features/allJobs/allJobsSlice';

// get the reducers / slice
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});
