// REFACTORED !!! -> with AXIOS INTERCEPTORS APPROACH !!

// imports
import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

// ================================================================

// ========================
// **** registerUserThunk
// ========================
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// ========================
// **** loginUserThunk
// ========================
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// ========================
// **** updateUserThunk
// ========================
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    // ### REFACTORED - AXIOS INTERCEPTORS APPROACH !!
    /*
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    */
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    // console.log(error.response);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
