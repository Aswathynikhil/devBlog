import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from "./redux/store/store"

import {GoogleOAuthProvider} from "@react-oauth/google"
const clientId="147036499950-f67od3budm4k3bri5suo9a2aguc7n5kd.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId} >
    <App />
    </GoogleOAuthProvider>
  </Provider>
);


