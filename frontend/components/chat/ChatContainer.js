import { connect } from 'react-redux';

import fetchProfile from 'actions/fetchProfileAction';
import { enterChat, leaveChat, sendMessage } from 'actions/chatActions';

import Chat from './Chat';

const mapStateToProps = ({
    profile: { username: userName },
    chat: { log, status, onlineUsers }
}) => ({
    userName,
    status,
    log,
    onlineUsers
});

const mapDispatchToProps = (dispatch) => ({
    fetchData() {
        dispatch(fetchProfile());
    },

    enterChat() {
        dispatch(enterChat());
    },

    leaveChat() {
        dispatch(leaveChat());
    },
    
    sendMessage(message) {
        dispatch(sendMessage(message));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);