// ================================================
// ================================================
// ##### THIS IS THE FIRST VERSION OF userSlice.js
// BEFORE REFACTORING !!!
// ================================================
// ================================================

// **** imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// import the customFetch
import customFetch from '../../utils/axios';

// get the functions for the functionality ofthe local storage
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

// initial state
const initialState = {
  isLoading: false,
  //user: null, // check for the user in the local storage
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
};

// =================================
// **** placeholder - registerUser
// =================================

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    //console.log(`Register User : ${user}`);
    // to see what we actually pass in:

    // *** THIS IS REPLACED WITH AXIOS
    /*
    console.log(`Register User : ${JSON.stringify(user)}`); // we'll see the values of the object! -> this is what we'll send to the server
    */

    // *** FOR TESTING PURPOSES
    // /auth/testingRegister
    /*
    try {
      const resp = await customFetch.post('/auth/testingRegister', user); // user object -> what the server is looking for -> we get here a proper response: a user object with the token

      //console.log(resp); // test
    } catch (error) {
      //console.log(error.response); // in axios is error.response // test
      toast.error(error.response.data.msg);
    }
    */

    try {
      const resp = await customFetch.post('/auth/register', user);
      //console.log(resp); // test
      return resp.data; // where the user object will be located
    } catch (error) {
      //console.log(error.response); // in axios is error.response // test
      //toast.error(error.response.data.msg);

      // => use thunkAPI and reject with the value
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// ==============================
// **** placeholder - loginUser
// ==============================

// *** REPLACED WITH AXIOS
/*
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    //console.log(`Login User : ${user}`);
    console.log(`Login User : ${JSON.stringify(user)}`);
  }
);
*/

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login', user);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// ================================
// **** updateUser - Profile Page
// ================================
// PATCH /auth/updateUser
// { email:'john@gmail.com', name:'john', lastName:'smith', location:'my location' }
// authorization header : 'Bearer token'
// sends back the user object with token
// REMEMBER: these updates will happen in the SERVER !!
// method to update => PATCH
// token => this value prevents that any other user modifies the data of another user!!
// this token needs to be attached therefore to the REQUEST!

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    // user => what we'll be passing from profile page !!
    try {
      const resp = await customFetch.patch(
        // url
        '/auth/updateUser',
        user,
        // options -> third argument in patch method (AXIOS)
        {
          headers: {
            // REMEMBER: Bearer -> this keyword is requested by the server!
            // first user -> name of our slice
            // second user -> property we have in the state
            // official name of this token => JSON Web Token or JWT => common and popular option when it comes to authentication!!

            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            //authorization: `Bearer`, // ERROR 401
            // ERROR 400 -> can be solved in frontend and send proper request
            // ERROR 401 -> we have no access to the resource! - the user should not be even in the dashboard - problem with the token - we should immediatly log out the user!!!
          },
        }
      );
      return resp.data;
    } catch (error) {
      //console.log(error.response); // EX: when we try to update a user with an existing email!

      // log out the user if there's an 401 ERROR !
      // the status property -> the type of error
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser()); // reducer we already have in userSlice!
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// **** userSlice definition
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },

  // set up the extra reducers
  // -------------------------
  // REMEMBER: for the register -> we need a unique email
  extraReducers: {
    //
    // ==================
    // **** FOR REGISTER
    // ==================
    // => pending
    [registerUser.pending]: (state) => {
      state.isLoading = true; // while the request takes place, loading is true
    },
    // => fulfilled
    // in the payload we have whatever we are returning
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },
    // => rejected
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // ===============
    // **** FOR LOGIN
    // ===============
    // => pending
    [loginUser.pending]: (state) => {
      state.isLoading = true; // while the request takes place, loading is true
    },
    // => fulfilled
    // in the payload we have whatever we are returning
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },
    // => rejected
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // =================
    // **** FOR UPDATE
    // =================
    // => pending
    [updateUser.pending]: (state) => {
      // when the request is in progress -> loading is TRUE !!
      state.isLoading = true;
    },
    // => fulfilled
    [updateUser.fulfilled]: (state, { payload }) => {
      // if everything is OK -> get back the user!
      const { user } = payload;
      state.isLoading = false;
      state.user = user; // update the new user
      addUserToLocalStorage(user); // to keep the data when we refresh the page or when the user comes back!
      toast.success(`User Updated! 🤩`);
    },
    // => rejected
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

// export the actions
export const { toggleSidebar, logoutUser } = userSlice.actions;

// **** export the reducer
export default userSlice.reducer;

// CREDENTIALS CREATED FOR THIS PROJECT
// sebas
// sebas@gmail.com
// 123456
