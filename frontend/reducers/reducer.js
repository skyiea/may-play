import TYPES from 'actions/actionTypes';
import FEConstants from 'utils/Constants';

import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import chatReducer from './chatReducer';

function rootReducer(state, action) {
    const { type } = action;

    switch (type) {
        case TYPES.LOGIN:
            return {
                ...state,
                loggedIn: true
            };
        case TYPES.LOGOUT_SUCCESS:
            window.localStorage.removeItem(FEConstants.LS_LOGGED_KEY);
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

export default function (state, action) {
    return {
        ...state,
        ...rootReducer(state, action),
        signup  : signupReducer(state, state.signup, action),
        login   : loginReducer(state, state.login, action),
        profile : profileReducer(state, state.profile, action),
        chat    : chatReducer(state, state.chat, action)
    };
}