import chatSocket from '../ws/chatSocket';
import TYPES from './actionTypes';

export function enterChatAC(status) {
    return {
        type: TYPES.CHAT.ENTER,
        status
    };
}

export function leaveChatAC(status) {
    return {
        type: TYPES.CHAT.LEAVE,
        status
    };
}

export function disconnectedAC() {
    return {
        type: TYPES.CHAT.DISCONNECTED
    };
}

export function sendMessageAC(status, message) {
    return {
        type: TYPES.CHAT.SEND_MESSAGE,
        payload: message,
        status
    };
}

export function receiveMessageAC(payload) {
    return {
        type: TYPES.CHAT.RECEIVE_MESSAGE,
        payload
    };
}

export function enterChat() {
    chatSocket.open();

    return enterChatAC('request');
}

export function leaveChat() {
    chatSocket.close();

    return leaveChatAC('request');
}

export function sendMessage(message) {
    chatSocket.emit('user-message', message);
    
    return sendMessageAC('request', message);
}