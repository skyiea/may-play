import TYPES from 'actions/actionTypes';
import constants from 'utils/constants';

export default function rootReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case TYPES.LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    ...state.login,
                    error: null
                }
            };
        case TYPES.LOGIN_SUCCESS:
            window.localStorage.setItem(constants.LS_loggedKey, true);
            break;
        case TYPES.LOGIN:
            return {
                ...state,
                loggedIn: true
            };
        case TYPES.LOGIN_FAILURE: {
            return {
                ...state,
                login: {
                    ...state.login,
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
        default:
            break;
    }

    return state;
}