export default function (initialState, identificator) {
    return (state = initialState, action) => {
        if (action.type.indexOf(identificator + '__') === 0) {
            if (action.newState === undefined) return state;
            if (action.newState === 'reset') return state;

            return {
                ...state,
                ...action.newState
            };
        }

        return state;
    };
}