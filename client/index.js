import React from "react";
import ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import ReduxThunk from 'redux-thunk';

import App from '../common/components/App'
import reducers from '../common/reducers'

const preloadedState = window.__PRELOADED_STATE__
const store = Redux.createStore(reducers, preloadedState, Redux.applyMiddleware(ReduxThunk));

ReactDOM.render(
  <ReactRedux.Provider store={store} >
    <App />
  </ReactRedux.Provider>,
  document.getElementById('app')
);