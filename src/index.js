import '@babel/polyfill'
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import promise from 'redux-promise'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(promise)

  ))

ReactDOM.render( <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
