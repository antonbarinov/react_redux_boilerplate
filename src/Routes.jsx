import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { setHistory } from './helpers/redirect';
import store from 'reduxStore/store';

import MainPage from './pages/main';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notFound';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';
import GithubPage from './pages/github';
import Layout from 'layouts/main';


export default class Routes extends React.Component {
    render() {
        return [
            <Route key="1" component={HistorySetter}/>,
            <Switch key="2">
                <Route path="/" exact ><Layout><MainPage /></Layout></Route>
                <Route path="/login" exact ><Layout><LoginPage /></Layout></Route>
                <Route path="/signup" exact ><Layout><SignUpPage /></Layout></Route>
                <Route path="/github" exact ><Layout><GithubPage /></Layout></Route>
                <PrivateRoute path="/profile"><Layout><ProfilePage /></Layout></PrivateRoute>
                <Route><Layout><NotFoundPage /></Layout></Route>
            </Switch>
        ];
    }
}

function HistorySetter({ history }) {
    setHistory(history);
    return null;
}

function PrivateRoute({ children, ...rest }) {
    const user = store.getState().user.data;
    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    React.cloneElement(children, props)
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}