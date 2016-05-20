import TYPES from 'actions/actionTypes';

export default function (state, domainState, action) {
    const { type, payload } = action;

    switch (type) {
        case TYPES.PROFILE_FETCH_REQUEST:
            return {
                ...domainState,
                fetched: false
            };
        case TYPES.PROFILE_FETCH_SUCCESS:
            return {
                ...domainState,
                fetched: true,
                username: payload.username,
                email: payload.email
            };
        case TYPES.PROFILE_UPDATE_SUCCESS:
            return {
                ...domainState,
                ...payload // updated profile data
            };
        default:
            break;
    }

    return domainState;
}