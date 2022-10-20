// ====================================
// FIRST VERSION BEFORE REFACTORING
// ====================================

// **** imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // createAsyncThunk -> for communication with the server
import { toast } from 'react-toastify'; // in case of successes or errors
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage'; // job location = user location
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'; // actions from allJobsSlice
import { logoutUser } from '../user/userSlice'; // action for logging out the user

// =========================================================================================

// **** initial state
// careful with these values, any typo error will cause problems with the server
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'], // will be select inputs
  jobType: 'full-time', // default value of options
  statusOptions: ['interview', 'declined', 'pending'], // select inputs
  status: 'pending', // default value of status
  isEditing: false, // will have functionality to edit the job
  editJobId: '',
};

// **** set up CREATE JOB
export const createJob = createAsyncThunk(
  'job/createJob', // the action -> create job
  async (job, thunkAPI) => {
    try {
      // post (complete url - end point , the job, authorization headers - protected route)
      // remember: with thunkAPI -> we can get the entire state -> we access the user slice
      const resp = await customFetch.post('/jobs', job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      // if we are successful -> clear the values
      thunkAPI.dispatch(clearValues());
      return resp.data; // not gonna use it, but return it
    } catch (error) {
      /*
      // basic setup
      return thunkAPI.rejectWithValue(error.response.data.msg); // just display error
      */
      // basic setup + logout user, in case of 401 error!
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
      // basic return!
      return thunkAPI.rejectWithValue(error.response.data.msg); // in case of any other error!
    }
  }
);

// **** set up DELETE JOB
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    console.log(jobId); // TEST
    try {
      // DELETE METHOD
      // DELETE /jobs/jobId -> this is the endpoint
      // authorization header : 'Bearer token'
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs()); // now this function takes over the Loading
      return resp.data.msg; // for the payload and toast !!
    } catch (error) {
      // hide loading when there is an error
      // otherwise infinite spinner
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// **** set up EDIT JOB
export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkAPI) => {
    try {
      // jobId -> to set up the request
      // job -> the payload
      // AXIOS -> patch method to edit !
      // the url is the same as for delete, the method is different
      const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues()); // no point to keep those values after editing
      return resp.data; // returning the object
    } catch (error) {
      // display a toast in case of error
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// **** set up the SLICE
const jobSlice = createSlice({
  name: 'job',
  initialState,

  // reducers -> the ones that control our state values!
  // first -> state
  // second -> action, inside of the action, the payload property. In this case the payload will be an object
  reducers: {
    // ==============================
    // **** reducer for handleChange
    // ==============================
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value; // dynamic change the values on the state (dynamic properties from javascript)
    },

    // ============================
    // **** reducer to clearValues
    // ============================
    clearValues: () => {
      // we can return something from the reducer -> the new state
      //return initialState; // whatever we have in the initial state

      // but the location! -> get it from the local storage
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
        // job loaction will be always the user location !!
      };
    },

    // ============================
    // **** reducer to setEditJob
    // ============================
    setEditJob: (state, { payload }) => {
      // spread the existing state values
      // override isEditing to true
      // ...payload -> pass the rest of the properties
      return { ...state, isEditing: true, ...payload };
    },
  },

  // **** EXTRA REDUCERS
  // -------------------
  extraReducers: {
    // ==============
    // ** createJob
    // ==============

    // ==> pending
    [createJob.pending]: (state) => {
      state.isLoading = true; // while request is in process!
    },
    // ==> fulfilled
    [createJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    // ==> rejected
    [createJob.rejected]: (state, { payload }) => {
      // ,{payload} => destructure the action !
      state.isLoading = false;
      toast.error(payload);
    },

    // ==============
    // ** deleteJob
    // ==============

    // ==> fulfilled
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    // ==> rejected
    [deleteJob.rejected]: (state, { payload }) => {
      //state.isLoading = false; // we don't need the loading because the loading we're dealing with is in the all job slice
      toast.error(payload);
    },

    // ==============
    // ** editJob
    // ==============

    // ==> pending
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    // ==> fulfilled
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Modified...');
    },
    // ==> rejected
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

// export the reducer
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

// export the slice
export default jobSlice.reducer;
