import * as React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

const mapStateToProps = (state) => {
    return {
        time: state.time
    }
};

@connect(mapStateToProps)
@CSSModules(require('./styles.scss'))
export default class MainPage extends React.Component {
    render() {
        const { time } = this.props;

        return (
            <div className="container">
                <h1>Main page</h1>
                Time is: <b styleName="time">{time}</b>
            </div>
        );
    }
}