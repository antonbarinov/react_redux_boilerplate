import '@babel/polyfill'; // Need for async/await

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as userActions from 'reduxStore/reducers/user/actions';

import App from './App';

import './index.css';

// Fetch user data / check for authorization
userActions.me().catch(() => {});

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);