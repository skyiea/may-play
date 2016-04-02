import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from 'reducers/rootReducer';
import constants from 'utils/constants';

const initialState = {
    loggedIn: !!window.localStorage.getItem(constants.lsLoggedKey),
    
    signup: {
        error: null,
        processing: false
    },
    
    login: {
        error: null,
        processing: false
    },
    
    profile: {
        fetched: false,
        updating: false,
        username: null,
        email: null
    }
};

const middlewares = [ thunkMiddleware ];

if (DEBUG) {
    middlewares.push(createLogger({
        actionTransformer: (action) => ({
            ...action,
            type: String(action.type)
        })
    }));
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export function configureStore() {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers/rootReducer', () => {
            const nextReducer = require('reducers/rootReducer');

            store.replaceReducer(nextReducer);
        });
    }

    return store;
}