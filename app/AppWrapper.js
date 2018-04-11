import React, { PureComponent } from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";

import reducers from "./reducers";
import App from "./App";

const reducer = combineReducers(reducers);
const store = createStore(reducer, compose(applyMiddleware(thunk)));

class AppWrapper extends PureComponent {
  render() {
    return (
      <Provider store={ store }>
        <App { ...this.props } />
      </Provider>
    );
  }
}

export default AppWrapper;
