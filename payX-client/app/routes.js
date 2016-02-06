import React, { Component } from 'react';
import { Router, Route, DefaultRoute, NotFoundRoute } from 'react-router';
import { history } from 'history';

import App from './containers/App';
import HomePage from './containers/HomePage';

class Routes extends Component {
  render() {
    <div>
      <Router history={history}>
        <Route path='/' component={App}>
          <Route path="/homePage" component={ HomePage }/>
        </Route>
      </Router>
    </div>
  }
}

export default Routes;
