// **** imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

// **** initial state

// ==> initialFiltersState -> at one point we'll want to set back everything to the default!
const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

// **** GetAllJobs Request
// GET /jobs => root url + /jobs
// authorization header : 'Bearer token' => because it is a restricted request !!
// returns {jobs:[],totalJobs:number, numOfPages:number }

export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  // _ => just means that we are not using this parameter
  async (_, thunkAPI) => {
    let url = `/jobs`; // set up the variable

    try {
      // REFACTORED WITH AXIOS INTERCEPTORS APPROACH !!!
      /*
      const resp = await customFetch.get(url, {
        // authorization headers
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      */

      const resp = await customFetch.get(url);

      //console.log(resp.data); // TEST: array of jobs 10, with number of pages, 10 job objects per page
      return resp.data;
    } catch (error) {
      // EX: this happens when the url is wrong
      //return thunkAPI.rejectWithValue('There was an error...');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// **** the slice
const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,

  // ========================
  // ==> REDUCERS & ACTIONS
  // Toggling Loading...
  // ========================
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },

  // ===================
  // ==> EXTRA REDUCERS
  // ===================
  extraReducers: {
    // ==> pending
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    // ==> fulfilled
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    },
    // ==> rejected
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

// export the reducers & actions
export const { showLoading, hideLoading } = allJobsSlice.actions;

export default allJobsSlice.reducer;
