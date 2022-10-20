// ===========================================================
// Authorization Header REFACTORING
// File Approach
// Modification in jobThunk.js
// REMEMBER: Axios Interceptors approach is used at the end!!
// ===========================================================

import customFetch from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';
import { logoutUser } from '../user/userSlice';

// ===========================================================================

// =====================
// Authorization Header
// =====================

const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};

// =================
// createJobThunk
// =================

export const createJobThunk = async (job, thunkAPI) => {
  try {
    // post (complete url - end point , the job, authorization headers - protected route)
    // remember: with thunkAPI -> we can get the entire state -> we access the user slice

    // #### REPLACED WITH AUTH-HEADER
    /*
    const resp = await customFetch.post('/jobs', job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    */

    const resp = await customFetch.post('/jobs', job, authHeader(thunkAPI));

    // if we are successful -> clear the values
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    /*
    *** basic setup
    return thunkAPI.rejectWithValue(error.response.data.msg); // just display error
    */

    // *** basic setup + logout user, in case of 401 error!
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    // basic return!
    return thunkAPI.rejectWithValue(error.response.data.msg); // in case of any other error!
  }
};

// =================
// deleteJobThunk
// =================

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  //console.log(jobId); // TEST
  try {
    // DELETE METHOD
    // DELETE /jobs/jobId -> this is the endpoint
    // authorization header : 'Bearer token'

    // #### REPLACED WITH AUTH-HEADER
    /*
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    */

    const resp = await customFetch.delete(
      `/jobs/${jobId}`,
      authHeader(thunkAPI)
    );

    thunkAPI.dispatch(getAllJobs()); // now this function takes over the Loading
    return resp.data.msg; // for the payload and toast !!
  } catch (error) {
    // hide loading when there is an error
    // otherwise infinite spinner
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// =================
// editJobThunk
// =================

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    // jobId -> to set up the request
    // job -> the payload
    // AXIOS -> patch method to edit !
    // the url is the same as for delete, the method is different

    // #### REPLACED WITH AUTH-HEADER
    /*
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    */

    const resp = await customFetch.patch(
      `/jobs/${jobId}`,
      job,
      authHeader(thunkAPI)
    );

    thunkAPI.dispatch(clearValues()); // no point to keep those values after editing
    return resp.data; // returning the object
  } catch (error) {
    // display a toast in case of error
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
