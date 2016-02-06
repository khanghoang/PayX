import "babel-polyfill";
import ReactDOM from 'react-dom';
import React from 'react';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Routes from './routes';
// import configureStore from './store/configureStore';
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
      <Route path="/" component={HomePage}>
        <IndexRoute component={HomePage}/>
        <Route path="homepage" component={HomePage}/>
      </Route>
    </Router>
  </Provider>),
  document.getElementById('container')
);
