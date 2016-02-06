import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/root';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(intialState) {
  let store = createStoreWithMiddleware(reducer, intialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/root', () => {
      const nextReducer = require('../reducers/root')
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
