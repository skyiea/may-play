import TYPES from 'actions/actionTypes';
import FEConstants from 'utils/Constants';

export default function rootReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case TYPES.SIGNUP_REQUEST:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    processing: true,
                    error: null
                }
            };
        case TYPES.SIGNUP_SUCCESS:
            window.localStorage.setItem(FEConstants.LS_LOGGED_KEY, true);

            return {
                ...state,
                signup: {
                    ...state.signup,
                    processing: false,
                    error: null
                }
            };
        case TYPES.SIGNUP_FAILURE:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    processing: false,
                    error: payload
                }
            };
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
            window.localStorage.setItem(FEConstants.LS_LOGGED_KEY, true);
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
        case TYPES.LOGIN_FAILURE:
            return {
                ...state,
                login: {
                    ...state.login,
                    processing: false,
                    error: payload
                }
            };
        case TYPES.LOGOUT_SUCCESS:
            window.localStorage.removeItem(FEConstants.LS_LOGGED_KEY);
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
        case TYPES.PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...payload // updated profile data
                }
            };
        default:
            break;
    }

    return state;
}