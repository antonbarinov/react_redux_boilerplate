import * as React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import * as userActions from 'reduxStore/reducers/user/actions';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

const mapStateToProps = (state) => {
    return {
        user: state.user.data,
    };
};

@withRouter
@connect(mapStateToProps)
export default class LayoutHeader extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <header className={ styles.header }>
                <AuthorizedOnlyLink user={ user } to="/profile">Profile</AuthorizedOnlyLink>
                <NotAuthorizedOnlyLink user={ user } to="/login">Login</NotAuthorizedOnlyLink>
                <CustomLink to="/">Main</CustomLink>
                <CustomLink to="/github">Github</CustomLink>
                { user &&
                <span className={ styles.link } onClick={ () => userActions.logout() }>Logout</span>
                }
            </header>
        );
    }
}

function AuthorizedOnlyLink({ children, user, ...rest }) {
    if (!user) return null;
    return <CustomLink { ...rest }>{ children }</CustomLink>;
}

function NotAuthorizedOnlyLink({ children, user, ...rest }) {
    if (user) return null;
    return <CustomLink { ...rest }>{ children }</CustomLink>;
}

function CustomLink({ children, to, className, ...rest }) {
    const stylesStr = [ styles.link ];
    if (className) stylesStr.push(className);

    return (
        <Route
            path={ to }
            exact
            children={ ({ match }) => (
                <Link to={ to } { ...rest } className={ stylesStr.join(' ') } data-active={ match ? 'active' : '' }>{ children }</Link>
            ) }
        />
    );
}