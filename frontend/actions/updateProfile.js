import fetch from 'utils/fetch';
import TYPES from './actionTypes';

function profileUpdateRequest() {
    return {
        type: TYPES.PROFILE_UPDATE_REQUEST
    };
}

function profileUpdateSuccess() {
    return {
        type: TYPES.PROFILE_UPDATE_SUCCESS
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
            then(() => {
                dispatch(profileUpdateSuccess());
            }).
            catch((error) => {
                dispatch(profileUpdateFailure(error));
            });
    };
}