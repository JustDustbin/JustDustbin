'use strict';

import { combineReducers } from 'redux';
//import connstate from './connstate';
//import connwizardstate from './connwizardstate';
//import reconnstate from './reconnstate';
//import auth0state from './auth0state';
import routesState from './routes_state';
//import appsstate from './appsstate';
//import maintabsstate from './maintabsstate';

/*
const CombinedReducer = combineReducers({
  connstate,
  connwizardstate,
  reconnstate,
  routesstate,
  auth0state,
  appsstate,
  maintabsstate
})
*/

const CombinedReducer = combineReducers({
  routesState
})

export default CombinedReducer;
