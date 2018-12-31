import * as React from 'react';
import Header from './header';
import Footer from './footer';

import './main.css';

export default class Layout extends React.Component {
    render() {
        return (
            <span>
                <div id="wrap">
                    <Header/>
                    <div id="main">
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
            </span>
        );
    }
}