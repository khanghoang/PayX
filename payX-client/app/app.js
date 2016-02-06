import ReactDOM from 'react-dom';
import React from 'react';
import HomePage from './containers/HomePage';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  (<Provider store={store}>
    <HomePage />
  </Provider>),
  document.getElementById('container')
);
