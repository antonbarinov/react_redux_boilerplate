import * as React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

@connect(mapStateToProps)
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class ProfilePage extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <div className="container">
                <h1 styleName="title">Hello, {user.full_name}!</h1>
            </div>
        );
    }
}