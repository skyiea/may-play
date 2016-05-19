import store from 'store';
import ws from './ws';
import { enterChatAC, receiveMessageAC } from '../actions/chatActions';

const handleEntered = () => {
    store.dispatch(enterChatAC('success'));
};

const handleUserMessage = (payload) => {
    store.dispatch(receiveMessageAC({
        type: 'user-message',
        payload
    }));
};

const handleServerMessage = (payload) => {
    store.dispatch(receiveMessageAC({
        type: 'server-message',
        payload
    }));
};

module.exports = {
    listenMessages() {
        ws.
            on('chat/entered', handleEntered).
            on('chat/user-message', handleUserMessage).
            on('chat/server-message', handleServerMessage);
    },
    
    unlistenMessages() {
        ws.
            off('chat/entered', handleEntered).
            off('chat/user-message', handleUserMessage).
            off('chat/server-message', handleServerMessage);
    }
};