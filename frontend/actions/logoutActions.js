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

export default function () {
    return function (dispatch) {
        dispatch(logoutRequest());

        fetch('/api/logout', {
            method: 'post'
        }).
            then(() => {
                dispatch(logoutSuccess());
                dispatch(doLogout());
            }).
            catch((error) => {
                dispatch(logoutFailure(error));
            });
    };
}