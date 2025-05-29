import {combineReducers} from 'redux';
import {commonReducer} from './reducers';

const appReducer = combineReducers({
  commonReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
