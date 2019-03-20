import * as React from 'react';

import styles from './styles.module.scss';


export default class ReactClassComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ styles.ComponentName }>
                <h1>Hello world</h1>
            </div>
        );
    }
}