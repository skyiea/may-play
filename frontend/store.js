import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from 'reducers/rootReducer';

const initialState = {
    loggedIn: false,
    
    login: {
        error: null
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