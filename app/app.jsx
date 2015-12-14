import 'babel-polyfill';

import { Router, Route, IndexRoute } from 'react-router';
import { createHashHistory } from 'history/lib';

import WebApp from 'web-app/WebApp';
import Index from 'pages/index/Index';

import 'app.scss';

const history = createHashHistory({
    queryKey: false
});

ReactDOM.render((
    <Router history={history}>
        <Route path="/" component={WebApp}>
            <IndexRoute component={Index}/>
        </Route>
    </Router>
), document.getElementById('react-app'));

// By default Lo-Dash will be exposed in global scope, which is not what we want when using Webpack.
_.noConflict();