import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { reducer as headerReducer } from '../components/Header/redux';
import waterReducer from '../pages/water/redux/reducer';
import heartReducer from '../pages/heart/redux/reducer';

const logger = createLogger();

const finalCreateStore = compose(
  applyMiddleware(thunk, logger)
)(createStore);

const rootReducer = combineReducers({
  headerReducer,
  waterReducer,
  heartReducer,
  routing: routerReducer
});

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
