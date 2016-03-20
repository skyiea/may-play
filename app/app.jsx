import 'babel-polyfill';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Carcass from 'carcass/Carcass';
import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';
import Profile from 'pages/profile/Profile';

import 'app.scss';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Carcass}>
            <IndexRoute component={Login}/>
            <Route path="login" component={Login}/>
            <Route path="signup" component={Signup}/>
            <Route path="profile" component={Profile}/>
        </Route>
    </Router>
), document.getElementById('may-play-app'));

// By default Lo-Dash will be exposed in global scope, which is not what we want when using Webpack.
_.noConflict();