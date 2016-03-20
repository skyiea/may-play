import 'babel-polyfill';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Carcass from 'carcass/Carcass';
import LoginContainer from 'pages/login/LoginContainer';
import Signup from 'pages/signup/Signup';
import Profile from 'pages/profile/Profile';

import { isLoggedIn } from 'utils/auth';

import 'app.scss';

function requireAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

function requireNoAuth(nextState, replace) {
    if (isLoggedIn()) {
        replace({
            pathname: '/profile',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Carcass}>
            <IndexRoute component={LoginContainer}/>

            /* Only for non-authorized users */
            <Route onEnter={requireNoAuth}>
                <Route path="login" component={LoginContainer}/>
                <Route path="signup" component={Signup}/>
            </Route>

            /* Only for authorized users */
            <Route onEnter={requireAuth}>
                <Route path="profile" component={Profile}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('may-play-app'));