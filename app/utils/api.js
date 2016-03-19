import fetch from 'utils/fetch';

export function login(username, password) {
    return fetch('/api/login', {
        method: 'post',
        body: JSON.stringify({ username, password })
    });
}

export function logout() {
    return fetch('/api/logout', {
        method: 'post'
    });
}