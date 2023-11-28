import { combineReducers } from 'redux';
import { tokenReducer } from '@/store/reducer/tokenReducer';
import { tripPreferenceReducer } from '@/store/reducer/tripPreferenceReducer';
import { notificationReducer } from '@/store/reducer/notificationReducer';

export const rootReducer = combineReducers({
  token: tokenReducer,
  types: tripPreferenceReducer,
  notification: notificationReducer
});

