import * as React from 'react';
import { hot } from 'react-hot-loader'
import Routes from './Routes';
import Layout from './layouts/main';


class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes/>
            </Layout>
        );
    }
}

export default hot(module)(App);