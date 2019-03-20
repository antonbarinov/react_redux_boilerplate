import identificator from './identificator';
import dispatcher from 'reduxStore/dispatcher';
import axios from 'axios';
import { tabTypes } from './constants';
import store from 'reduxStore/store';

const perPage = 30;

const sleep = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));


export function newTab(tabType) {
    const state = JSON.parse(JSON.stringify(store.getState().github));
    if (tabTypes[tabType] === undefined) throw 'Invalid tab type';

    for (const tab of state.tabs) {
        tab.active = false;
    }

    const tab = {
        id: state.tabNextId,
        tabData: {
            searchQuery: '',
            filtersData: {},
            isDataFetching: false,
            actualFetchDataIndex: 0,
            data: [],
        },
        pagination: {
            page: 1,
            pages: 1,
            itemsCount: 0,
        },
        active: true,
        isTabVirgin: true,
        tabType,
    };
    state.tabs.push(tab);

    //getDataForTab(state.tabNextId).catch(console.error);

    state.tabNextId++;

    dispatcher('newTab', identificator, state);
}

export function switchTab(tabId) {
    const state = JSON.parse(JSON.stringify(store.getState().github));

    for (const tab of state.tabs) {
        tab.active = tab.id === tabId;
    }

    dispatcher('switchTab', identificator, state);
}

export function getTabFilters(tabId) {
    const state = JSON.parse(JSON.stringify(store.getState().github));
    return state.tabs.filter(tab => tab.id === tabId)[0].tabData.filtersData;
}

export async function updateTabFilters(tabId, filtersData) {
    const state = JSON.parse(JSON.stringify(store.getState().github));
    const tab = getTabById(state, tabId);

    tab.tabData.filtersData = filtersData;
    tab.pagination.page = 1;

    dispatcher('updateTabFilters', identificator, state);

    await getDataForTab(tabId);
}

export async function updateTabSearchQuery(tabId, searchQuery) {
    const state = JSON.parse(JSON.stringify(store.getState().github));
    const tab = getTabById(state, tabId);

    tab.tabData.searchQuery = searchQuery;
    tab.pagination.page = 1;

    dispatcher('updateTabSearchQuery', identificator, state);

    await getDataForTab(tabId);
}

function getTabById(state, tabId) {
    for (let tab of state.tabs) {
        if (tab.id === tabId) {
            return tab;
        }
    }
}

async function getDataForTab(tabId) {
    let state = JSON.parse(JSON.stringify(store.getState().github));
    let tab = getTabById(state, tabId);

    const { filtersData } = tab.tabData;
    let filters = [];
    let val,
        basicUrl;

    /**
     * Repositories
     */
    if (tab.tabType === tabTypes.Repositories) {
        val = filtersData.minStars;
        if (val && val.length && val >= 0) {
            filters.push(`stars:>=${ val }`);
        }
        else {
            filters.push(`stars:>=0`); // Because of github bug if choose only "fork" filter
        }

        val = filtersData.minForks;
        if (val && val.length && val >= 0) {
            filters.push(`forks:>=${ val }`);
        }

        val = filtersData.forks;
        if (val === 'yes') {
            filters.push(`fork:only`);
        }
        else if (val === 'no') {
            filters.push(`fork:false`);
        }
        else if (val === 'all') {
            filters.push(`fork:true`);
        }

        basicUrl = 'https://api.github.com/search/repositories?q=';
    }
    /**
     * Users
     */
    else if (tab.tabType === tabTypes.Users) {
        val = filtersData.minRepos;
        if (val && val.length && val >= 0) {
            filters.push(`repos:>=${ val }`);
        }
        else {
            filters.push(`repos:>=0`);
        }

        val = filtersData.minFollowers;
        if (val && val.length && val >= 0) {
            filters.push(`followers:>=${ val }`);
        }

        basicUrl = 'https://api.github.com/search/users?q=';
    }


    // Send request
    let queryString = '';
    if (tab.tabData.searchQuery) queryString += tab.tabData.searchQuery;
    if (filters.length) {
        if (queryString.length > 0) queryString += ' ';
        queryString += filters.join(' ');
    }

    const { page } = tab.pagination;
    queryString += `&page=${ page }&per_page=${ perPage }`;

    const actualFetchDataIndex = ++tab.tabData.actualFetchDataIndex;

    tab.tabData.isDataFetching = true;

    dispatcher('getDataForTab', identificator, state); // Store part of important data

    await sleep(500); // Send request only after 500ms delay on last filter change

    // Get fresh data after async calls or timeout waiting's
    state = JSON.parse(JSON.stringify(store.getState().github));
    tab = getTabById(state, tabId);

    if (actualFetchDataIndex !== tab.tabData.actualFetchDataIndex) return;

    let response = await axios.get(basicUrl + queryString);

    // Get fresh data after async calls or timeout waiting's
    state = JSON.parse(JSON.stringify(store.getState().github));
    tab = getTabById(state, tabId);

    if (response.status === 200) {
        // In case if we send multiple requests in progress
        if (actualFetchDataIndex === tab.tabData.actualFetchDataIndex) {
            const resultJson = response.data;

            // Get fresh data after async calls or timeout waiting's
            state = JSON.parse(JSON.stringify(store.getState().github));
            tab = getTabById(state, tabId);

            tab.tabData.data = resultJson.items;
            tab.pagination.itemsCount = resultJson.total_count;
            tab.pagination.pages = Math.ceil(resultJson.total_count / perPage);
        }
    }
    else {
        alert(`Github api error`);
    }

    // In case if we send multiple requests in progress
    if (actualFetchDataIndex === tab.tabData.actualFetchDataIndex) {
        tab.tabData.isDataFetching = false;
    }

    tab.isTabVirgin = false;

    dispatcher('getDataForTab', identificator, state);
}

export function changePage(tabId, page) {
    const state = JSON.parse(JSON.stringify(store.getState().github));
    const tab = getTabById(state, tabId);

    tab.pagination.page = page;

    dispatcher('changePage', identificator, state);

    getDataForTab(tabId).catch(console.error);
}

export function removeTab(tabId) {
    const state = JSON.parse(JSON.stringify(store.getState().github));

    if (state.tabs.length === 1) {
        state.tabs = [];
    }
    else if (state.tabs.length > 1) {
        let index = 0;
        let tabIndex = 0;
        let isTabActive = false;
        for (const tab of state.tabs) {
            if (tab.id === tabId) {
                tabIndex = index;
                isTabActive = tab.active;
                break;
            }
            index++;
        }

        if (isTabActive) {
            if (tabIndex === 0) {
                state.tabs[1].active = true;
            }
            else {
                state.tabs[tabIndex - 1].active = true;
            }
        }

        state.tabs.splice(tabIndex, 1);
    }

    dispatcher('removeTab', identificator, state);
}
