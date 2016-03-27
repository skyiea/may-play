import fetch from 'utils/fetch';
import TYPES from './actionTypes';

import { doLogin } from 'actions/login';

function signupRequest() {
    return {
        type: TYPES.SIGNUP_REQUEST
    };
}

function signupSuccess(payload) {
    return {
        type: TYPES.SIGNUP_SUCCESS,
        payload
    };
}

function signupFailure(payload) {
    return {
        type: TYPES.SIGNUP_FAILURE,
        payload,
        error: true
    };
}

export default function signup(data) {
    return function (dispatch) {
        dispatch(signupRequest());

        fetch('/api/signup', {
            method: 'post',
            body: JSON.stringify(data)
        }).
            then((result) => {
                dispatch(signupSuccess(result));
                dispatch(doLogin());
            }).
            catch((error) => {
                dispatch(signupFailure(error));
            });
    };
}