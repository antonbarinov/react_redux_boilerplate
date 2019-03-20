import * as React from 'react';
import Header from './header';
import Footer from './footer';

import styles from './styles.module.scss';

export default class Layout extends React.Component {
    render() {
        const { children, ...restParams } = this.props;
        return (
            <span>
                <div className={styles.wrap}>
                    <Header/>
                    <div className={styles.main}>
                        {React.cloneElement(children, restParams)}
                    </div>
                </div>
                <Footer/>
            </span>
        );
    }
}