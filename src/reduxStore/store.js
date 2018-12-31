import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import { createLogger } from 'redux-logger'

let middleware = [];

if (PRODUCTION === false) {
    const logger = createLogger({
        collapsed: true,
    });
    middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;