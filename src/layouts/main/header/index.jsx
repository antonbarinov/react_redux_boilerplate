import * as React from 'react';
import CSSModules from 'react-css-modules';
import { Link, Route, withRouter } from 'react-router-dom';
import * as userActions from 'reduxStore/reducers/user/actions';
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return {
        user: state.user.data,
    }
};

@withRouter
@connect(mapStateToProps)
@CSSModules(require('./styles.scss'))
export default class LayoutHeader extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <header styleName="header">
                <div styleName="tbl">
                    <div styleName="tbc">
                        <AuthorizedOnlyLink user={user} to="/profile" styleName="link">Profile</AuthorizedOnlyLink>
                        <NotAuthorizedOnlyLink user={user} to="/login" styleName="link">Login</NotAuthorizedOnlyLink>
                        <CustomLink to="/" styleName="link">Main</CustomLink>
                        <CustomLink to="/github" styleName="link">Github</CustomLink>
                        { user &&
                            <span styleName="link" onClick={() => userActions.logout()}>Logout</span>
                        }
                    </div>
                </div>
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