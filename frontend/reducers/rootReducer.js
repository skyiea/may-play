import TYPES from 'actions/actionTypes';
import constants from 'utils/constants';

export default function rootReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case TYPES.SIGNUP_SUCCESS:
            window.localStorage.setItem(constants.LS_loggedKey, true);
            break;
        case TYPES.LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    ...state.login,
                    processing: true,
                    error: null
                }
            };
        case TYPES.LOGIN_SUCCESS:
            window.localStorage.setItem(constants.LS_loggedKey, true);
            break;
        case TYPES.LOGIN:
            return {
                ...state,
                loggedIn: true,
                login: {
                    ...state.login,
                    processing: false,
                    error: null
                }
            };
        case TYPES.LOGIN_FAILURE: {
            return {
                ...state,
                login: {
                    ...state.login,
                    processing: false,
                    error: payload
                }
            };
        }
        case TYPES.LOGOUT_SUCCESS:
            window.localStorage.removeItem(constants.LS_loggedKey);
            break;
        case TYPES.LOGOUT:
            return {
                ...state,
                loggedIn: false
            };
        case TYPES.PROFILE_FETCH_REQUEST:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fetched: false
                }
            };
        case TYPES.PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fetched: true,
                    username: payload.username,
                    email: payload.email
                }
            };
        default:
            break;
    }

    return state;
}