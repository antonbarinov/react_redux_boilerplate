import "@babel/polyfill"; // Need for async/await

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from 'reduxStore/store';
import * as userActions from 'reduxStore/reducers/user/actions';

import App from './App';

import './index.css';

// Fetch user data / check for authorization
userActions.me().catch(console.error);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

