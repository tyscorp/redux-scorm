import {
    INITIALIZE,
    TERMINATE,
    GET_VALUE,
    SET_VALUE,
    COMMIT,
    GET_LAST_ERROR,
    GET_ERROR_STRING,
    GET_DIAGNOSTIC
} from './action-types';

const defaultState = {
    model: {}
};

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case INITIALIZE:
            return {
                ...state,
                model: payload
            };

        case SET_VALUE:
            return {
                ...state,
                model: {
                    ...state.model,
                    [payload.element]: payload.value
                }
            };

        default:
            return state;
    }
}
