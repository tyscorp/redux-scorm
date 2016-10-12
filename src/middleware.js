import _ from 'lodash';

import SCORMError from './error';
import * as actions from './actions';
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

import getModel from './model';

function initialize(scorm, next, action) {
    scorm.Initialize('');

    if (scorm.GetLastError() !== '0') {
        throw new SCORMError(scorm);
    }

    return reinitialize(scorm, next, action);
}

function reinitialize(scorm, next, { payload }) {
    if (payload) {
        return next({ type: INITIALIZE, payload });
    }

    const model = getModel(scorm);

    return next({ type: INITIALIZE, payload: model });
}

function catchErrorsForAPICall(scorm, next, action, fn) {
    const returnValue = fn();

    const errorCode = scorm.GetLastError();

    if (errorCode !== '0') {
        throw new SCORMError(scorm);
    }

    next(action);

    return returnValue;
}

export default function middleware({ scorm, autoInitialize = false, initializeWithData = null }) {
    return (store) => {
        if (autoInitialize) {
            setTimeout(() => store.dispatch(actions.initialize(initializeWithData)));
        }

        return (next) => (action) => {
            const catchErrors = _.partial(catchErrorsForAPICall, scorm, next, action);

            switch (action.type) {
                case INITIALIZE:
                    return initialize(scorm, next, action);

                case REINITIALIZE:
                    return reinitialize(scorm, next, action);

                case TERMINATE:
                    return catchErrors(() =>
                        scorm.Terminate('')
                    );

                case GET_VALUE:
                    return catchErrors(() =>
                        scorm.GetValue(String(action.payload.element))
                    );

                case SET_VALUE:
                    return catchErrors(() =>
                        scorm.SetValue(String(action.payload.element), String(action.payload.value))
                    );

                case COMMIT:
                    return catchErrors(() =>
                        scorm.Commit('')
                    );

                case GET_LAST_ERROR:
                    return catchErrors(() =>
                        scorm.GetLastError('')
                    );

                case GET_ERROR_STRING:
                    return catchErrors(() =>
                        scorm.GetErrorString(String(action.payload.errorCode))
                    );

                case GET_DIAGNOSTIC:
                    return catchErrors(() =>
                        scorm.GetDiagnostic(String(action.payload.errorCode))
                    );

                default:
                    next(action);
            }
        };
    };
}
