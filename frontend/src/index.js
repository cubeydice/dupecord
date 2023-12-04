
//IMPORTS - REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

//IMPORTS - STORE
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import './index.css';

//IMPORTS - APP
import App from './App';

//Google Analytics
const TRACKING_ID = "G-0WXTFCDJN0";
ReactGA.initialize(TRACKING_ID);

//STORE CONFIG
const store = configureStore();

//DEVELOPMENT
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

//ROOT
function Root() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  );
}

//RENDER
const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}