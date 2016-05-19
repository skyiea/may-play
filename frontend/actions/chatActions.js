import ws from 'ws/ws';
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
    ws.emit('chat/enter');

    return enterChatAC('request');
}

export function leaveChat() {
    ws.emit('chat/leave');

    return leaveChatAC('request');
}

export function sendMessage(message) {
    ws.emit('chat/user-message', message);
    
    return sendMessageAC('request', message);
}