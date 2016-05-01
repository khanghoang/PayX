import "babel-polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SendMoney from './containers/SendMoney';
import SuccessfulPage from './containers/SuccessfulPage';
import ViewTransactions from './containers/ViewTransactions';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Router, Route, IndexRoute } from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

import agent from 'superagent';

import sinon from 'sinon';
console.log(sinon);

const history = createHistory();
const middleware = syncHistory(history);
const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
});

const finalCreateStore = compose(
  applyMiddleware(middleware),
  applyMiddleware(thunk),
)(createStore);
const store = finalCreateStore(reducer);
middleware.listenForReplays(store);

// setup fake server
// const server = sinon.fakeServer.create({
//   // respondImmediately: true
//   autoRespondAfter: 2000,
//   autoRespond: true
// });
// server.respondWith("POST", "http://localhost:3000/send_money",
//                   [200, { "Content-Type": "application/json" },
//                     '{ "stuff": "is", "awesome": "in here" }']);
// server.respondWith("POST", "http://localhost:3000/send_money",
//                   [200, { "Content-Type": "application/json" },
//                     '{ "stuff": "is", "awesome": "in here" }']);
// server.autoRespondAfter = 2000;
// window.server = server;
window.agent = agent;
// window.sinon = sinon;

ReactDOM.render(
  (<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="sendMoney" component={SendMoney}/>
        <Route path="successfulPage" component={SuccessfulPage}/>
        <Route path="viewTransactions" component={ViewTransactions}/>
      </Route>
    </Router>
  </Provider>),
  document.getElementById('container')
);
