import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  status: 'initial'
};

export default function mainScreenState(state = initialState, action = {}) {
  switch (action.type) {
    case types.MAIN_SCREEN_ITEMS_LOADING:
      return {
        ...state,
        status: 'loading'
      };
    case types.MAIN_SCREEN_ITEMS_SUCCESS:
      return {
        ...state,
        items: [...state.items ,...action.items]
               .sort((a,b) => {
                  if(a.id > b.id) {
                    return 1;
                  }
                  else if(a.id < b.id) {
                    return -1;
                  }
                  else {
                    return 0;
                  }
                })
               .filter((val,i,arr) => {
                  if((i+1)===arr.length) {
                    return true;
                  }
                  else {
                    return val.id !== arr[i+1].id;
                  }
                }),
        status: 'success'
      };
    case types.MAIN_SCREEN_ITEMS_EMPTY_SUCCESS:
      return {
        ...state,
        status: 'success'
      };
    case types.MAIN_SCREEN_ITEMS_ERROR:
      return {
        ...state,
        status: 'error'
      };
    default:
      return state;
  }
}