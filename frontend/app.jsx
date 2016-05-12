import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import { configureStore } from 'store';
import Constants from '../universal/Constants';
import FEConstants from 'utils/Constants';

import CarcassContainer from 'carcass/CarcassContainer';
import LoginContainer from 'pages/login/LoginContainer';
import SignupContainer from 'pages/signup/SignupContainer';
import HomeContainer from 'pages/home/HomeContainer';
import ProfileContainer from 'pages/profile/ProfileContainer';
import ProfileEditContainer from 'pages/profile-edit/ProfileEditContainer';
import LogoutContainer from 'pages/logout/LogoutContainer';

import 'app.scss';

const store = configureStore();

function requireAuth(nextState, replace) {
    if (!store.getState().loggedIn) {
        replace({
            pathname: Constants.INDEX_ROUTE.GUEST,
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

function requireUnauth(nextState, replace) {
    if (store.getState().loggedIn) {
        replace({
            pathname: Constants.INDEX_ROUTE.USER,
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

const ReduxProvider = (props) => (
    <Provider store={store}>
        <CarcassContainer>
            {props.children}
        </CarcassContainer>
    </Provider>
);

// used to logout/login tabs opened in parallel
window.addEventListener('storage', (e) => {
    if (e.key === FEConstants.LS_LOGGED_KEY) {
        document.location.reload();
    }
});

const Socket = io();

Socket.on('hello', () => {
    console.debug('hello message from WS');
});

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={ReduxProvider}>
            <IndexRedirect to="login"/>
            <Route path="logout" component={LogoutContainer}/>

            /* Only for unauthorized users */
            <Route onEnter={requireUnauth}>
                <Route path="login" component={LoginContainer}/>
                <Route path="signup" component={SignupContainer}/>
            </Route>

            /* Only for authorized users */
            <Route onEnter={requireAuth}>
                <Route path="home" component={HomeContainer}/>
                <Route path="profile" component={ProfileContainer}/>
                <Route path="profile/edit" component={ProfileEditContainer}/>
            </Route>

            <Redirect path="*" to="/"/>
        </Route>
    </Router>
), document.getElementById('app'));