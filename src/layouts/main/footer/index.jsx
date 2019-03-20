import * as React from 'react';

import styles from './styles.module.scss';

export default class LayoutFooter extends React.Component {
    render() {
        return (
            <footer className={ styles.footer }>
                some footer content
            </footer>
        );
    }
}