import TYPES from 'actions/actionTypes';

export default function (state, domainState, action) {
    const { type, payload, status } = action;

    switch (type) {
        case TYPES.CHAT.ENTER:
            if (status === 'success') {
                return {
                    ...domainState,
                    status: 'online'
                };
            }

            break;
        case TYPES.CHAT.LEAVE:
            return {
                ...domainState,
                status: 'offline',
                log: []
            };
        case TYPES.CHAT.SEND_MESSAGE:
            return {
                ...domainState,
                log: [
                    ...domainState.log,
                    {
                        type: 'user-message',
                        payload: {
                            user: state.profile.username,
                            message: payload,
                            date: Date.now()
                        }
                    }
                ]
            };
        case TYPES.CHAT.RECEIVE_MESSAGE:
            return {
                ...domainState,
                log: [
                    ...domainState.log,
                    payload
                ]
            };
        case TYPES.CHAT.DISCONNECTED:
            return {
                ...domainState,
                log: [],
                status: 'disconnected'
            };
        default:
            break;
    }

    return domainState;
}