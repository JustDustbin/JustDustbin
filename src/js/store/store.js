'use strict';

import { createStore } from 'redux';
import reducer from '../reducers';
import devToolsEnhancer from 'remote-redux-devtools';

export default function configureStore() {
  return createStore(reducer, devToolsEnhancer());
}
