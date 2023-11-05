import { createStore, combineReducers } from 'redux';
import {
  notificationsCountReducer,
  tokenReducer,
  eventSourceReducer,
  commentReducer,
} from './reducers';

//test

const rootReducer = combineReducers({
  notificationsCount: notificationsCountReducer,
  token: tokenReducer,
  eventSource: eventSourceReducer,
  comment: commentReducer,
});

const store = createStore(rootReducer);

export default store;
