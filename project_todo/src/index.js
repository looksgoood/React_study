import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { App, Home, Login, Register } from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk'; //dispatcher 가 action creator 가 만든 action 객체 외에도, 저희가 만든 함수도 처리 할 수 있게 해줘요.

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    </Provider>
    , rootElement);