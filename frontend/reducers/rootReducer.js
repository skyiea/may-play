import TYPES from 'actions/actionTypes';

export default function rootReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case TYPES.LOGIN_SUCCESS:
            window.localStorage.setItem('logged', true);
            return {
                ...state,
                loggedIn: true
            };
        case TYPES.LOGIN_FAILURE: {
            const { login } = state;

            return {
                ...state,
                login: {
                    ...login,
                    error: payload
                }
            };
        }
        default:
            break;
    }

    return state;
}