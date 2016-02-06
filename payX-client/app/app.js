import "babel-polyfill";
import ReactDOM from 'react-dom';
import React from 'react';
import HomePage from './containers/HomePage';
import SendMoney from './containers/SendMoney';
import ViewTransactions from './containers/ViewTransactions';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

import { Router, Route, IndexRoute } from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

const history = createHistory();
const middleware = syncHistory(history);
const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
});

const finalCreateStore = compose(
  applyMiddleware(middleware),
)(createStore);
const store = finalCreateStore(reducer);
middleware.listenForReplays(store);

ReactDOM.render(
  (<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={HomePage} />
      <Route path="homepage" component={HomePage}/>
      <Route path="sendMoney" component={SendMoney}/>
      <Route path="viewTransactions" component={ViewTransactions}/>
    </Router>
  </Provider>),
  document.getElementById('container')
);
