import { combineReducers } from 'redux';
import { tokenReducer } from '@/store/reducer/tokenReducer';

export const rootReducer = combineReducers({
  token: tokenReducer,
});

