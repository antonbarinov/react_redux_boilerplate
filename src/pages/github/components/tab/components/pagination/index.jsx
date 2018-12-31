import * as React from 'react';
import * as githubActions from 'reduxStore/reducers/github/actions';
import CSSModules from 'react-css-modules';


@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class Pagination extends React.Component {
    render() {
        const { tab } = this.props;
        const { page, pages } = tab.pagination;

        if (pages <= 1) return null;

        return (
            <div styleName="pagination">
                <div styleName="page-switcher" data-disabled={page === 1 ? 'true' : ''} onClick={() => githubActions.changePage(tab.id, page - 1)}>Prev page</div>
                <div styleName="current-page">{page}</div>
                <div styleName="page-switcher" data-disabled={page === pages ? 'true' : ''} onClick={() => githubActions.changePage(tab.id, page + 1)}>Next page</div>
            </div>
        );
    }
}