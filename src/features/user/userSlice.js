// ============================================================
// REFACTORED VERSION of userSlice.js
// To see the first version go to userSlice_first_version.js
// ============================================================

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

// AFTER REFACTORING
// import functions from userThunk
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
} from './userThunk';

// ====================================================================================

// **** initial state
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
    // ==> AFTER REFACTORING !!
    return registerUserThunk('/auth/register', user, thunkAPI);
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
    return loginUserThunk('/auth/login', user, thunkAPI);
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
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);

// ==========================
// **** userSlice definition
// ==========================

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      // if there is a payload
      if (payload) {
        toast.success(payload);
      }
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
