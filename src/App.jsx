import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'reduxStore/store';
import Routes from './Routes';


export default function App() {
    return (
        <Provider store={ store }>
            <Router>
                <Routes />
            </Router>
        </Provider>
    );
}