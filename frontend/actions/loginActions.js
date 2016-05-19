import fetch from 'utils/fetch';
import TYPES from './actionTypes';

function loginRequest() {
    return {
        type: TYPES.LOGIN_REQUEST
    };
}

function loginSuccess(payload) {
    return {
        type: TYPES.LOGIN_SUCCESS,
        payload
    };
}

function loginFailure(payload) {
    return {
        type: TYPES.LOGIN_FAILURE,
        payload,
        error: true
    };
}

export function doLogin() {
    return {
        type: TYPES.LOGIN
    };
}

export default function (username, password) {
    return function (dispatch) {
        dispatch(loginRequest());

        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({ username, password })
        }).
            then((result) => {
                dispatch(loginSuccess(result));
                dispatch(doLogin());
            }).
            catch((error) => {
                dispatch(loginFailure(error));
            });
    };
}