import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/store'

import App from './App';
import WelcomePage from './pages/welcome/WelcomePage';

import { WaterMainPage, WaterListPage, WaterAddPage } from './pages/water';
import { HeartMainPage, HeartListPage, HeartAddPage } from './pages/heart';

import MePage from './pages/me/MePage';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */}
    <Router history={history}>
      <Route path="/app" component={App}>
        <IndexRedirect to="/app/water" />
        <Route path="water" component={WaterMainPage}>
          <IndexRoute component={WaterListPage} />
          <Route path="add" component={WaterAddPage} />
        </Route>
        <Route path="heart" component={HeartMainPage}>
          <IndexRoute component={HeartListPage} />
          <Route path="add" component={HeartAddPage} />
        </Route>
        <Route path="me" component={MePage} />
      </Route>
      <Route path="/" component={WelcomePage} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
