import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import promise from "redux-promise";
import App from "./App";
import rootReducer from "./reducers";
import { HashRouter as Router, Route, Switch } from "react-router-dom";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promise))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
          <Switch>
              <Route exact path="/" component={App}/>
              <Route path="/users/:username/:perpage" component={App}/>
          </Switch>
       </Router>
  </Provider>,
  document.getElementById("root")
);
