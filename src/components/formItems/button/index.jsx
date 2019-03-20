import * as React from 'react';

import styles from './styles.module.scss';


class FormButton extends React.Component {
    render() {
        let { innerRef, ...props } = this.props;

        return (
            <div className={styles.button} {...props} ref={innerRef}>
                {props.children}
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <FormButton innerRef={ref} {...props}/>);