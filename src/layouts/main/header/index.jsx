import * as React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import * as userActions from 'reduxStore/reducers/user/actions';
import { connect } from "react-redux";

import styles from './styles.module.scss';

const mapStateToProps = (state) => {
    return {
        user: state.user.data,
    }
};

@withRouter
@connect(mapStateToProps)
export default class LayoutHeader extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <header className={styles.header}>
                <AuthorizedOnlyLink user={user} to="/profile" className={styles.link}>Profile</AuthorizedOnlyLink>
                <NotAuthorizedOnlyLink user={user} to="/login" className={styles.link}>Login</NotAuthorizedOnlyLink>
                <CustomLink to="/" className={styles.link}>Main</CustomLink>
                <CustomLink to="/github" className={styles.link}>Github</CustomLink>
                { user &&
                    <span className={styles.link} onClick={() => userActions.logout()}>Logout</span>
                }
            </header>
        );
    }
}

function AuthorizedOnlyLink({ children, user, ...rest}) {
    if (!user) return null;
    return <CustomLink {...rest}>{children}</CustomLink>;
}

function NotAuthorizedOnlyLink({ children, user, ...rest}) {
    if (user) return null;
    return <CustomLink {...rest}>{children}</CustomLink>;
}

function CustomLink({ children, to, ...rest }) {
    return (
        <Route
            path={to}
            exact
            children={({ match }) => (
                <Link to={to} {...rest} data-active={match ? "active" : ""}>{children}</Link>
            )}
        />
    );
}