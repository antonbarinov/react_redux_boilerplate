import * as React from 'react';
import CSSModules from 'react-css-modules';


@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class FormButton extends React.Component {
    render() {
        let props = { ...this.props };
        delete props.setRef;

        return (
            <div styleName="button" {...props} ref={this.props.setRef}>
                {this.props.children}
            </div>
        );
    }
}