import * as React from 'react';

import styles from './styles.module.scss';


export default class FormServerErrors extends React.Component {
    static defaultProps = {
        msg: null
    };

    render() {
        const { msg } = this.props;
        if (!msg) return null;

        return (
            <div className={styles.serverErrorsContainer}>
                <div className={styles.msg}>{msg}</div>
            </div>
        );
    }
}