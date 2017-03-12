import * as types from '../constants/actionTypes';

const initialState = {
  status: 'initial'
};

export default function registerScreenState(state = initialState, action = {}) {
  switch (action.type) {
    case types.REGISTER_SCREEN_LOADING:
      return {
        ...state,
        status: 'loading'
      };
    case types.REGISTER_SCREEN_SUCCESS:
      return {
        ...state,
        status: 'success'
      };
    case types.REGISTER_SCREEN_ERROR:
      return {
        ...state,
        status: 'error'
      };
    default:
      return state;
  }
}