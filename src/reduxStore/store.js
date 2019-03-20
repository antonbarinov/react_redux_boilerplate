import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

import { createLogger } from 'redux-logger';

let middleware = [];

if (PRODUCTION === false) {
    const logger = createLogger({
        collapsed: true,
    });
    middleware.push(logger);
}

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);

const store = createStore(reducers, enhancer);

export default store;