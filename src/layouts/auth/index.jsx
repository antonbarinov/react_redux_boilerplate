import * as React from 'react';

import styles from './styles.module.scss';


export default class Layout extends React.Component {
    render() {
        const { children, ...restParams } = this.props;
        return (
            <span>
                <div className={ styles.wrap }>
                    <div className={ styles.content_holder }>
                        <div>
                            { React.cloneElement(children, restParams) }
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}