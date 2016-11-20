import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/store'

import App from './containers/App';
import Auth from './containers/Auth';
import Welcome from './containers/Welcome';
import { LoginPage } from './pages/auth';
import { HeartListPage, HeartAddPage } from './pages/heart';
import { WaterListPage, WaterAddPage } from './pages/water';
import { MePage, MeSettingPage } from './pages/me';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green300, green700, green100 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  fontFamily: '微软雅黑, Helvetica',
  palette: {
    primary1Color: green300,
    primary2Color: green700,
    primary3Color: green100,
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      { /* Tell the Router to use our enhanced history */}
      <Router history={history}>
        <Route path="/" component={Welcome} />

        <Route path="/auth" component={Auth}>
          <IndexRedirect to="/auth/login" />
          <Route path="login" component={LoginPage} />
        </Route>

        <Route path="/app" component={App}>
          <IndexRedirect to="/app/water" />
          <Route path="water">
            <IndexRoute component={WaterListPage} />
            <Route path="add" component={WaterAddPage} />
          </Route>
          <Route path="heart">
            <IndexRoute component={HeartListPage} />
            <Route path="add" component={HeartAddPage} />
          </Route>
          <Route path="me">
            <IndexRoute component={MePage} />
            <Route path="setting" component={MeSettingPage} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
