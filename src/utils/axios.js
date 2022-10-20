// REFACTORING !!
// AXIOS UTIL WITH INTERCEPTORS APPROACH !!

import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

export default customFetch;

// now find all our authenticated requests and remove the authorization header !!
// file where we should remove these headers:
// * userThunk.js
// * jobThunk.js
// * allJobsSlice.js
