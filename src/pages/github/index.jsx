import * as React from 'react';

import PanelHeader from './components/panel-header';
import Tab from './components/tab';
import Container from 'components/container';


export default class ProfilePage extends React.Component {
    render() {
        return (
            <Container>
                <PanelHeader />
                <Tab />
            </Container>
        );
    }
}