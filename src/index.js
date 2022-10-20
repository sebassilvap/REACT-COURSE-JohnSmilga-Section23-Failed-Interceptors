import React from 'react';

// change in this import
//import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'; // NEW CHANGE - React 18

// import nomalize.css (BEFORE THE index.css!!)
import 'normalize.css';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals'; // REMOVED!

// **** grab Store and Provider
import { store } from './store';
import { Provider } from 'react-redux';

// ===================================================================================
// REFACTORED WITH THE NEW CHANGE {createRoot} - React 18
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

const container = document.getElementById('root');
// create the root with that container and assign it to another variable
const root = createRoot(container);
root.render(
  // set up store and Provider that wraps the App
  <Provider store={store}>
    <App tab='home' />
  </Provider>
);

// ===================================================================================
// REMOVED !
/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
