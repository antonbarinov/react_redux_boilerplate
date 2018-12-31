import { combineReducers } from 'redux';

import user from './user/reducer';
import github from './github/reducer';
import time from './time/reducer';

const reducers = combineReducers({
    user,
    github,
    time,
});

export default reducers;