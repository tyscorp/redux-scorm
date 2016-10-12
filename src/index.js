export { default as middleware } from './middleware';
export { default as reducer } from './reducer';
export {
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

export {
    initialize,
    reinitialize,
    terminate,
    getValue,
    setValue,
    commit,
    getLastError,
    getErrorString,
    getDiagnostic
} from './actions';
