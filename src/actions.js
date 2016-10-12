import {
    INITIALIZE,
    REINITIALIZE,
    TERMINATE,
    GET_VALUE,
    SET_VALUE,
    COMMIT,
    GET_LAST_ERROR,
    GET_ERROR_STRING,
    GET_DIAGNOSTIC
} from './action-types';

function createAction(type, fn) {
    return (args) => {
        if (!fn) {
            return { type };
        }

        const payload = fn(args);
        return { type, payload };
    };
}

export const initialize = createAction(INITIALIZE, (payload) => payload);
export const reinitialize = createAction(REINITIALIZE, (payload) => payload);
export const terminate = createAction(TERMINATE);
export const getValue = createAction(GET_VALUE, (element) => ({ element }));
export const setValue = createAction(SET_VALUE, (element, value) => ({ element, value }));
export const commit = createAction(COMMIT);
export const getLastError = createAction(GET_LAST_ERROR);
export const getErrorString = createAction(GET_ERROR_STRING, (errorCode) => ({ errorCode }));
export const getDiagnostic = createAction(GET_DIAGNOSTIC, (errorCode) => ({ errorCode }));
