import * as React from 'react';

import styles from './styles.module.scss';


export default class Content extends React.Component {
    render() {
        const { tab } = this.props;
        const { data, isDataFetching } = tab.tabData;

        if ((tab.isTabVirgin || data.length === 0) && isDataFetching) return <div>Fetching data from Github...</div>;
        if (tab.isTabVirgin) return <div>Apply some filters to get results</div>;
        if (data.length === 0) return <div>Nothing found</div>;

        return (
            <div className={ styles.items_list }>
                { isDataFetching && <div className={ styles.fetching_overlap } /> }

                {
                    data.map(item => {
                        let text = item.login || item.full_name;

                        return (
                            <div className={ styles.item } key={ item.id }>
                                <a href={ item.html_url } target="_blank">{ text }</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}