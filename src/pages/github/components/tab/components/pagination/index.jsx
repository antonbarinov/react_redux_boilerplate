import * as React from 'react';
import * as githubActions from 'reduxStore/reducers/github/actions';

import styles from './styles.module.scss';


export default class Pagination extends React.Component {
    render() {
        const { tab } = this.props;
        const { page, pages } = tab.pagination;

        if (pages <= 1) return null;

        return (
            <div className={ styles.pagination }>
                <div className={ styles.page_switcher }
                     data-disabled={ page === 1 ? 'true' : '' }
                     onClick={ () => githubActions.changePage(tab.id, page - 1) }>Prev page
                </div>
                <div className={ styles.current_page }>{ page }</div>
                <div className={ styles.page_switcher }
                     data-disabled={ page === pages ? 'true' : '' }
                     onClick={ () => githubActions.changePage(tab.id, page + 1) }>Next page
                </div>
            </div>
        );
    }
}