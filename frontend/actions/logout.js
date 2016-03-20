import fetch from 'utils/fetch';
import TYPES from './actionTypes';

function logoutRequest() {
    return {
        type: TYPES.LOGOUT_REQUEST
    };
}

function logoutSuccess(payload) {
    return {
        type: TYPES.LOGOUT_SUCCESS,
        payload
    };
}

function logoutFailure(payload) {
    return {
        type: TYPES.LOGOUT_FAILURE,
        payload,
        error: true
    };
}

export function doLogout() {
    return {
        type: TYPES.LOGOUT
    };
}

export default function processLogout() {
    return function (dispatch) {
        dispatch(logoutRequest());

        fetch('/api/logout', {
            method: 'post'
        }).
            then((result) => {
                if (result.success) {
                    dispatch(logoutSuccess(result));
                    dispatch(doLogout());
                } else {
                    throw result.payload;
                }
            }).
            catch((error) => {
                dispatch(logoutFailure(error));
            });
    };
}