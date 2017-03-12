'use strict';

import { combineReducers } from 'redux';
import routesState from './routes_state';
import workerState from './worker_state';
import mainScreenState from './main_screen_state';
import registerScreenState from './register_screen_state';

const CombinedReducer = combineReducers({
  routesState,
  workerState,
  mainScreenState,
  registerScreenState
})

export default CombinedReducer;
