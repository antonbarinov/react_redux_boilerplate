import * as React from 'react';
import CSSModules from 'react-css-modules';

import PanelHeader from './components/panel-header';
import Tab from './components/tab';

@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class ProfilePage extends React.Component {
    render() {
        return (
            <div className="container">
                <PanelHeader />
                <Tab />
            </div>
        );
    }
}