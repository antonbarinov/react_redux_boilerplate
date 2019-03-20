import store from './store';

const dispatcher = (prefix, identificator, newState) => {
    store.dispatch({
        type: identificator + '__' + prefix,
        newState,
    });
};

export default dispatcher;