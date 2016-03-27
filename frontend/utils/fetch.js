import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export default function (url, options = {}) {
    const {
        headers = {},
        accept = true,
        ...otherOptions
    } = options;
    
    if (accept) {
        headers.Accept = 'application/json';
    }

    return fetch(url, {
        credentials: 'same-origin',
        ...otherOptions,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    }).
        then((res) => {
            switch (res.status) {
                case 302:   // redirection
                    return res.json().then(({ location, ...payload }) => {
                        // timeout is necessary to make promise to be executed by other listeners
                        setTimeout(() => {
                            browserHistory.push(location);
                        }, 0);
    
                        return payload;
                    });
                case 401:   // unauthorized
                    setTimeout(() => {
                        browserHistory.push('logout');
                    }, 0);

                    throw new Error('Unauthorized');
                default:
            }

            if (accept) {
                return res.json().catch(() => {
                    throw new Error('Error parsing server response as JSON.');
                });
            } else {
                return res;
            }
        });
}