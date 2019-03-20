import * as React from 'react';
import { connect } from 'react-redux';
import Container from 'components/container';

import styles from './styles.module.scss';


const mapStateToProps = (state) => {
    return {
        user: state.user.data,
    };
};

@connect(mapStateToProps)
export default class ProfilePage extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <Container>
                <h1 className={ styles.title }>Hello, { user.full_name }!</h1>
            </Container>
        );
    }
}