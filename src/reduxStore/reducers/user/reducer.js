import identificator from './identificator';

const initialState = false;

const user = (state = initialState, action) => {
    if (action.type.indexOf(identificator + '__') === 0) {
        if (action.newState === undefined) return state;
        return action.newState;
    }

    return state;
};

export default user;