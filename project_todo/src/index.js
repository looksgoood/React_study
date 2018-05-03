import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { App, Home, Login, Register } from 'containers';

const browserHistory = createBrowserHistory();
const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route exact path="/" component={Home} />
            <Route path="home" component={Home} />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
        </Route>
    </Router>
    , rootElement);