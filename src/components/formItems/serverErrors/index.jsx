import * as React from 'react';

import styles from './styles.module.scss';


export default function FormServerErrors({ msg = '' }) {
    if (!msg) return null;

    return (
        <div className={ styles.serverErrorsContainer }>
            <div className={ styles.msg }>{ msg }</div>
        </div>
    );
}