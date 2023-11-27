import { combineReducers } from 'redux';
import { tokenReducer } from '@/store/reducer/tokenReducer';
import { tripPreferenceReducer } from '@/store/reducer/tripPreferenceReducer';

export const rootReducer = combineReducers({
  token: tokenReducer,
  types: tripPreferenceReducer
});

