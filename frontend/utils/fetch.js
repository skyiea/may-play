import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export default function (url, options = {}) {
    const {
        headers = {},
        ...otherOptions
    } = options;
    
    return fetch(url, {
        credentials: 'same-origin',
        ...otherOptions,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        }
    }).
        then((res) => {
            const hasBody = res.headers.get('content-length') !== '0';

            if (res.ok) {   // error status 200..299
                if (hasBody) {
                    return res.json().catch(() => {
                        return Promise.reject('Error parsing server response as JSON.');
                    });
                }
            } else {    // all other error statuses
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

                        break;
                    default:
                }

                if (hasBody) {
                    return res.json().then(({ message }) => {
                        return Promise.reject(message || res.statusText);
                    });
                } else {
                    return Promise.reject(res.statusText);
                }
            }
        });
}