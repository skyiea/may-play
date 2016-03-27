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
            const withResponseData = res.headers.get('content-length') !== '0';

            if (res.ok) {   // error status 200..299
                if (withResponseData) {
                    return res.json().catch(() => {
                        throw new Error('Error parsing server response as JSON.');
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

                if (withResponseData) {
                    return res.json().then(({ message }) => {
                        throw new Error(message || res.statusText);
                    });
                } else {
                    throw new Error(res.statusText);
                }
            }
        });
}