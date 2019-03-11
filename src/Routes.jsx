import * as React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { setHistory } from './helpers/redirect';

import MainPage from './pages/main';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notFound';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';
import GithubPage from './pages/github';
import Layout from 'layouts/main';



const mapStateToProps = (state) => {
    return {
        user: state.user.data,
        userIsFetching: state.user.isFetching,
    }
};

@withRouter
@connect(mapStateToProps)
export default class Routes extends React.Component {
    render() {
        const { user, userIsFetching } = this.props;

        return [
            <Route key="1" component={HistorySetter}/>,
            <Switch key="2">
                <Route path="/" exact ><Layout><MainPage /></Layout></Route>
                <Route path="/login" exact ><Layout><LoginPage /></Layout></Route>
                <Route path="/signup" exact ><Layout><SignUpPage /></Layout></Route>
                <Route path="/github" exact ><Layout><GithubPage /></Layout></Route>
                <PrivateRoute user={user} userIsFetching={userIsFetching} path="/profile"><Layout><ProfilePage /></Layout></PrivateRoute>
                <Route><Layout><NotFoundPage /></Layout></Route>
            </Switch>
        ];
    }
}

function HistorySetter({ history }) {
    setHistory(history);
    return null;
}

function PrivateRoute({ children, user, userIsFetching, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                (userIsFetching === true || user) ? (
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