import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from 'reducers/rootReducer';
import FEConstants from 'utils/Constants';

const initialState = {
    loggedIn: !!window.localStorage.getItem(FEConstants.LS_LOGGED_KEY),
    
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
    },
    
    chat: {
        online: false,
        log: []
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
const store = createStoreWithMiddleware(rootReducer, initialState);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers/rootReducer', () => {
        const nextReducer = require('reducers/rootReducer');

        store.replaceReducer(nextReducer);
    });
}

module.exports = store;