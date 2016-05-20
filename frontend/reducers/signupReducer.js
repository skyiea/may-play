import TYPES from 'actions/actionTypes';
import FEConstants from 'utils/Constants';

export default function (state, domainState, action) {
    const { type, payload } = action;

    switch (type) {
        case TYPES.SIGNUP_REQUEST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case TYPES.SIGNUP_SUCCESS:
            window.localStorage.setItem(FEConstants.LS_LOGGED_KEY, true);

            return {
                ...state,
                processing: false,
                error: null
            };
        case TYPES.SIGNUP_FAILURE:
            return {
                ...state,
                processing: false,
                error: payload
            };
        default:
            break;
    }

    return domainState;
}