import io from 'socket.io-client';
import store from 'store';
import { enterChatAC, receiveMessageAC } from '../actions/chatActions';

let chatSocket;

function listenEventsFromServer() {
    chatSocket.
        on('entered', () => {
            store.dispatch(enterChatAC('success'));
        }).
        on('user-message', (payload) => {
            store.dispatch(receiveMessageAC({
                type: 'user-message',
                payload
            }));
        }).
        on('server-message', (payload) => {
            store.dispatch(receiveMessageAC({
                type: 'server-message',
                payload
            }));
        }).
        on('users-online', (userNames) => {
            console.debug(userNames);
        });
}

export default {
    open() {
        chatSocket = io.connect('/chat');
        listenEventsFromServer();
    },
    
    close() {
        chatSocket.disconnect();
        chatSocket = null;
    },
    
    emit(...args) {
        chatSocket.emit(...args);
    }
};