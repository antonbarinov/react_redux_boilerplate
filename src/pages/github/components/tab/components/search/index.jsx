import * as React from 'react';
import * as githubActions from 'reduxStore/reducers/github/actions';

import styles from './styles.module.scss';


export default class Search extends React.Component {
    inputHolder(e, tab) {
        const value = e.target.value;
        githubActions.updateTabSearchQuery(tab.id, value).catch(console.error);
    }

    render() {
        const { tab } = this.props;
        const { searchQuery } = tab.tabData;

        return (
            <div className={ styles.search }>
                <input placeholder="Search"
                       onChange={ (e) => this.inputHolder(e, tab) }
                       value={ searchQuery || '' }
                       autoComplete="off" />
            </div>
        );
    }
}