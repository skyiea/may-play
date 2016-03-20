import fetch from 'utils/fetch';

export function login(username, password) {
    return fetch('/api/login', {
        method: 'post',
        body: JSON.stringify({ username, password })
    }).
        then((result) => {
            if (result.success) {
                window.localStorage.setItem('logged', true);
            }

            return result;
        });
}

export function logout() {
    return fetch('/api/logout', {
        method: 'post'
    }).
        then((result) => {
            if (result.success) {
                window.localStorage.removeItem('logged');
            }
        
            return result;
        });
}

export function isLoggedIn() {
    return !!window.localStorage.getItem('logged');
}