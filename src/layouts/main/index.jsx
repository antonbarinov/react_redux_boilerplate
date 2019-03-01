import * as React from 'react';
import Header from './header';
import Footer from './footer';
import CSSModules from "react-css-modules";

@CSSModules(require('./styles.scss'))
export default class Layout extends React.Component {
    render() {
        const { children, ...restParams } = this.props;
        return (
            <span>
                <div styleName="wrap">
                    <Header/>
                    <div styleName="main">
                        {React.cloneElement(children, restParams)}
                    </div>
                </div>
                <Footer/>
            </span>
        );
    }
}