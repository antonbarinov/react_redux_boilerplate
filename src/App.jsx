import * as React from 'react';
import { hot } from 'react-hot-loader'
import Routes from './Routes';

class App extends React.Component {
    render() {
        return (
            <Routes/>
        );
    }
}

export default hot(module)(App);