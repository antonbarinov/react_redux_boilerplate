import * as React from 'react';

import styles from './styles.module.scss';


class FormInput extends React.Component {
    render() {
        let { msg, innerRef, ...props } = this.props;

        let classesStr = [ styles.inputContainer ];
        if (msg) classesStr.push(styles.error);

        return (
            <div className={classesStr.join(' ')}>
                <input {...props} ref={innerRef}/>
                <div className={styles.msg}>{msg}</div>
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <FormInput innerRef={ref} {...props}/>);