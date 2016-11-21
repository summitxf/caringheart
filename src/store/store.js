import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { reducer as commonReducer } from '../components/commonRedux';
import authReducer from '../pages/auth/redux/reducer';
import waterReducer from '../pages/water/redux/reducer';
import heartReducer from '../pages/heart/redux/reducer';
import meReducer from '../pages/me/redux/reducer';

const logger = createLogger();

const finalCreateStore = compose(
  applyMiddleware(thunk, logger)
)(createStore);

const rootReducer = combineReducers({
  commonReducer,
  authReducer,
  waterReducer,
  heartReducer,
  meReducer,
  routing: routerReducer
});

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
