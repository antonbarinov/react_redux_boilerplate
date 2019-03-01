import * as React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import * as githubActions from 'reduxStore/reducers/github/actions';
import { tabTypes } from 'reduxStore/reducers/github/constants';

const mapStateToProps = (state) => {
    return {
        tabs: state.github.tabs
    }
};


@connect(mapStateToProps)
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class PanelHeader extends React.Component {

    removeTab(e, tab) {
        e.stopPropagation();
        githubActions.removeTab(tab.id);
    }

    renderTab(tab) {
        let styles = [ 'tab-item' ];
        if (tab.active) styles.push('active');

        return (
            <div styleName={styles.join(' ')} key={tab.id} onClick={() => githubActions.switchTab(tab.id)}>
                { tab.tabType }
                <span onClick={(e) => this.removeTab(e, tab)}>×</span>
            </div>
        )
    }

    render() {
        const { tabs } = this.props;

        return (
            <div styleName="PanelHeader">
                <div styleName="tab-menu">
                    <a onClick={() => githubActions.newTab(tabTypes.Users)} href="javascript:void(0)">Users</a>
                    <a onClick={() => githubActions.newTab(tabTypes.Repositories)} href="javascript:void(0)">Repositories</a>
                </div>
                <div styleName="tabs-list">
                    { tabs.map(tab => this.renderTab(tab)) }
                </div>
            </div>
        );
    }
}