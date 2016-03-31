import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { configureStore } from 'store';

import CarcassContainer from 'components/carcass/CarcassContainer';
import LoginContainer from 'pages/login/LoginContainer';
import SignupContainer from 'pages/signup/SignupContainer';
import ProfileContainer from 'pages/profile/ProfileContainer';
import LogoutContainer from 'pages/logout/LogoutContainer';

import 'app.scss';

const store = configureStore();

function requireAuth(nextState, replace) {
    if (!store.getState().loggedIn) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

function requireUnauth(nextState, replace) {
    if (store.getState().loggedIn) {
        replace({
            pathname: '/profile',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

const ReduxProvider = (props) => (
    <Provider store={store}>
        <CarcassContainer>
            { props.children }
        </CarcassContainer>
    </Provider>
);

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
                <Route path="profile" component={ProfileContainer}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('app'));