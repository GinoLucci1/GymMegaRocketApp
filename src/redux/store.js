import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { adminsReducer } from './admins/reducer';
import { activitiesReducer } from './activities/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  activity: activitiesReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
