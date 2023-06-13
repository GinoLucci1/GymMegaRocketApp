import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { SuperAdminsReducer } from './superadmins/reducer';

import trainersReducer from './trainers/reducer';
import { adminsReducer } from './admins/reducer';
import { activitiesReducer } from './activities/reducer';
import { membersReducer } from './members/reducer';
import { classesReducer } from './classes/reducer';

const rootReducer = combineReducers({
  trainers: trainersReducer,
  admins: adminsReducer,
  members: membersReducer,
  classes: classesReducer,
  activities: activitiesReducer,
  superAdmins: SuperAdminsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
