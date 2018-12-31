import identificator from './identificator';


const time = (state, action) => {
    if (state === undefined) return new Date().toISOString();

    if (action.type.indexOf(identificator + '__') === 0) {
        if (action.newState === undefined) return state;
        return action.newState;
    }

    return state;
};

export default time;