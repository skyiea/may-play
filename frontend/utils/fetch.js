import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export default function (url, options) {
    const { headers } = options;

    return fetch(url, {
        credentials: 'same-origin',
        ...options,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        }
    }).
        then((res) => {
            if (res.status === 302) { // redirection
                return res.json().then(({ location, ...payload }) => {
                    // timeout is necessary to make promise to be executed by other listeners
                    setTimeout(() => {
                        browserHistory.push(location);
                    }, 0);

                    return payload;
                });
            }

            return res.json();
        }).
        catch((err) => {
            console.error('Error occurred: %s', err);
        });
}