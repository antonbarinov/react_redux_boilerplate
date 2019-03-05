import identificator from './identificator';
import dynamicReducer from 'reduxStore/dynamicReducer';

const initialState = {
    isFetching: false,
    originalResponseData: false,
    data: false,
    error: null
};

export default dynamicReducer(initialState, identificator);