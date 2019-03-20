import * as React from 'react';
import * as githubActions from 'reduxStore/reducers/github/actions';
import { tabTypes } from 'reduxStore/reducers/github/constants';

import styles from './styles.module.scss';


export default class Filter extends React.Component {
    inputFiltersHolders(e, tab) {
        const name = e.target.name;
        const value = e.target.value;

        let tabFilters = githubActions.getTabFilters(tab.id);
        tabFilters[name] = value;
        githubActions.updateTabFilters(tab.id, tabFilters).catch(console.error);
    }

    render() {
        const { tab } = this.props;
        const { filtersData } = tab.tabData;

        if (tab.tabType === tabTypes.Repositories) {
            return (
                <div>
                    <div className={styles.filters_input_holder}>
                        <div>Min stars</div>
                        <div><input name="minStars" onChange={(e) => this.inputFiltersHolders(e, tab)} value={filtersData.minStars || ''} autoComplete="off" /></div>
                    </div>
                    <div className={styles.filters_input_holder}>
                        <div>Min forks</div>
                        <div><input name="minForks" onChange={(e) => this.inputFiltersHolders(e, tab)} value={filtersData.minForks || ''} autoComplete="off" /></div>
                    </div>
                    <div className={styles.filters_radio_holder}>
                        <div>Forks</div>
                        <div>
                            <label>
                                <input type="radio" name="forks" value="yes" checked={filtersData.forks === 'yes'} onChange={(e) => this.inputFiltersHolders(e, tab)} /> Yes
                            </label>
                            <label>
                                <input type="radio" name="forks" value="no" checked={filtersData.forks === 'no'} onChange={(e) => this.inputFiltersHolders(e, tab)} /> No
                            </label>
                            <label>
                                <input type="radio" name="forks" value="all" checked={filtersData.forks === 'all' || filtersData.forks === undefined} onChange={(e) => this.inputFiltersHolders(e, tab)} /> All
                            </label>
                        </div>
                    </div>
                </div>
            )
        } else if (tab.tabType === tabTypes.Users) {
            return (
                <div>
                    <div className={styles.filters_input_holder}>
                        <div>Min repos</div>
                        <div><input name="minRepos" onChange={(e) => this.inputFiltersHolders(e, tab)} value={filtersData.minRepos || ''} autoComplete="off" /></div>
                    </div>
                    <div className={styles.filters_input_holder}>
                        <div>Min followers</div>
                        <div><input name="minFollowers" onChange={(e) => this.inputFiltersHolders(e, tab)} value={filtersData.minFollowers || ''} autoComplete="off" /></div>
                    </div>
                </div>
            )
        }

        return null;
    }
}