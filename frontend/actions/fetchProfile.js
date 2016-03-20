import fetch from 'utils/fetch';
import TYPES from './actionTypes';

function profileFetchRequest() {
    return {
        type: TYPES.PROFILE_FETCH_REQUEST
    };
}

function profileFetchSuccess(payload) {
    return {
        type: TYPES.PROFILE_FETCH_SUCCESS,
        payload
    };
}

function profileFetchFailure(payload) {
    return {
        type: TYPES.PROFILE_FETCH_FAILURE,
        payload,
        error: true
    };
}

export default function fetchProfile() {
    return function (dispatch) {
        dispatch(profileFetchRequest());

        fetch('/api/profile').
            then((result) => {
                dispatch(profileFetchSuccess(result));
            }).
            catch((error) => {
                dispatch(profileFetchFailure(error));
            });
    };
}