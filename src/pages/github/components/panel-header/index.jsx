import * as React from 'react';
import { connect } from 'react-redux';
import * as githubActions from 'reduxStore/reducers/github/actions';
import { tabTypes } from 'reduxStore/reducers/github/constants';

import styles from './styles.module.scss';

const mapStateToProps = (state) => {
    return {
        tabs: state.github.tabs,
    };
};


@connect(mapStateToProps)
export default class PanelHeader extends React.Component {

    removeTab(e, tab) {
        e.stopPropagation();
        githubActions.removeTab(tab.id);
    }

    renderTab(tab) {
        let stylesStr = [ styles.tab_item ];
        if (tab.active) stylesStr.push(styles.active);

        return (
            <div className={ stylesStr.join(' ') } key={ tab.id } onClick={ () => githubActions.switchTab(tab.id) }>
                { tab.tabType }
                <span onClick={ (e) => this.removeTab(e, tab) }>×</span>
            </div>
        );
    }

    render() {
        const { tabs } = this.props;

        return (
            <div className={ styles.panel_header }>
                <div className={ styles.tab_menu }>
                    <a onClick={ () => githubActions.newTab(tabTypes.Users) } href="javascript:void(0)">Users</a>
                    <a onClick={ () => githubActions.newTab(tabTypes.Repositories) }
                       href="javascript:void(0)">Repositories</a>
                </div>
                <div className={ styles.tabs_list }>
                    { tabs.map(tab => this.renderTab(tab)) }
                </div>
            </div>
        );
    }
}