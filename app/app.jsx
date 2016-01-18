import 'babel-polyfill';

import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history/lib';

import Carcass from 'carcass/Carcass';
import Login from 'pages/login/Login';

import 'app.scss';

ReactDOM.render((
    <Router history={createHistory()}>
        <Route path="/" component={Carcass}>
            <IndexRoute component={Login}/>
        </Route>
    </Router>
), document.getElementById('may-play-app'));

// By default Lo-Dash will be exposed in global scope, which is not what we want when using Webpack.
_.noConflict();