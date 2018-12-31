import * as React from 'react';
import CSSModules from 'react-css-modules';


@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class ReactClass extends React.Component {
    render() {
        return (
            <div styleName="ComponentName">
                <h1>Hello world</h1>
            </div>
        );
    }
}