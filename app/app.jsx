import 'babel-polyfill';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Carcass from 'carcass/Carcass';
import Login from 'pages/login/Login';
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
            <IndexRoute component={Login}/>

            /* Only for non-authorized users */
            <Route onEnter={requireNoAuth}>
                <Route path="login" component={Login}/>
                <Route path="signup" component={Signup}/>
            </Route>

            /* Only for authorized users */
            <Route onEnter={requireAuth}>
                <Route path="profile" component={Profile}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('may-play-app'));