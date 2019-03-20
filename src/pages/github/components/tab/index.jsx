import * as React from 'react';
import Filter from './components/filter';
import Search from './components/search';
import Content from './components/content';
import Pagination from './components/pagination';
import { connect } from 'react-redux';

import styles from './styles.module.scss';


const mapStateToProps = (state) => {
    return {
        tabs: state.github.tabs,
    };
};


@connect(mapStateToProps)
export default class Tab extends React.Component {
    render() {
        const { tabs } = this.props;

        let activeTab = tabs.filter(tab => tab.active === true);
        if (activeTab.length === 0) return null;
        activeTab = activeTab[0];

        return (
            <div className={ styles.Tab } data-tab-id={ activeTab.id }>
                <h1>{ activeTab.tabType }</h1>
                <div className={ styles.tab_holder }>
                    <div className={ styles.filters }>
                        <Filter tab={ activeTab } />
                    </div>
                    <div className={ styles.content }>
                        <Search tab={ activeTab } />
                        <Content tab={ activeTab } />
                        <Pagination tab={ activeTab } />
                    </div>
                </div>
            </div>
        );
    }
}