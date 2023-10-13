import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import serversReducer from './servers';
import entitiesReducer from './entities';

export const rootReducer = combineReducers({
  session: sessionReducer,
  // servers: serversReducer,
  entities: entitiesReducer,
})

let enhancer;

//development tools
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

//attach redux store to react application
const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;