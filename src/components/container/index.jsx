import * as React from 'react';

import styles from './styles.module.scss';


export default function Container(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}