'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
  name_field: '',
  number_field: ''
};

export default function workerState(state = initialState, action = {}) {
  switch (action.type) {
    case types.WORKER_DETAILS_ADDED:
      return {
        ...state,
        name_field: action.name_field,
        number_field: action.number_field
      };
    default:
      return state;
  }
}
