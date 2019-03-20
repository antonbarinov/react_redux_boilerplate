import * as React from 'react';
import Header from './header';
import Footer from './footer';

import styles from './styles.module.scss';


export default function Layout({ children, ...restParams }) {
    return (
        <span>
            <div className={ styles.wrap }>
                <Header />
                <div className={ styles.main }>
                    { React.cloneElement(children, restParams) }
                </div>
            </div>
            <Footer />
        </span>
    );
}