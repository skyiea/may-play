import fetch from 'utils/fetch';
import TYPES from './actionTypes';

function profileUpdateRequest() {
    return {
        type: TYPES.PROFILE_UPDATE_REQUEST
    };
}

function profileUpdateSuccess(payload) {
    return {
        type: TYPES.PROFILE_UPDATE_SUCCESS,
        payload
    };
}

function profileUpdateFailure(payload) {
    return {
        type: TYPES.PROFILE_UPDATE_FAILURE,
        payload,
        error: true
    };
}

export default function updateProfile(data) {
    return function (dispatch) {
        dispatch(profileUpdateRequest());

        fetch('/api/profile', {
            method: 'post',
            body: JSON.stringify(data)
        }).
            then((payload) => {
                dispatch(profileUpdateSuccess(payload));
            }).
            catch((error) => {
                dispatch(profileUpdateFailure(error));
            });
    };
}