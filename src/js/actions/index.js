'use strict';

import * as types from '../constants/actionTypes';
import realm from '../realm';

export const callWorkerDetailsAdded = (name_field, number_field) => ({
  type: types.WORKER_DETAILS_ADDED,
  name_field: name_field,
  number_field: number_field
})

/*============================================================*/

export const callMainScreenItemsLoading = () => ({
  type: types.MAIN_SCREEN_ITEMS_LOADING
})

export const callMainScreenItemsSuccess = (items) => ({
  type: types.MAIN_SCREEN_ITEMS_SUCCESS,
  items: items
})

export const callMainScreenItemsEmptySuccess = () => ({
  type: types.MAIN_SCREEN_ITEMS_EMPTY_SUCCESS
})

export const callMainScreenItemsError = () => ({
  type: types.MAIN_SCREEN_ITEMS_ERROR
})

export function callMainScreenItemsLoad() { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
    dispatch(callMainScreenItemsLoading());
    return fetch(`http://just-dustbin.herokuapp.com/api/v1/dustbins`)
      .then(response => {
        if((response.status === 200)||(response.status === 400)||(response.status === 401)) {
          return response.json();
        }
      })
      .then((json) => {
        if(!json.hasOwnProperty('errors')) {
          dispatch(callMainScreenItemsSuccess(json.data));
        }
        else {
          if(json.errors[0]==="Empty.") {
            dispatch(callMainScreenItemsEmptySuccess());
          }
          else if(json.errors[0]==="Invalid token.") {
            dispatch(callMainScreenItemsError());
          }
          else {
            dispatch(callMainScreenItemsError());
          }
        }
      })
      .catch((error) => {dispatch(callMainScreenItemsError());});
  }
}

/*============================================================*/

export const callRegisterScreenLoading = () => ({
  type: types.REGISTER_SCREEN_LOADING
})

export const callRegisterScreenSuccess = () => ({
  type: types.REGISTER_SCREEN_SUCCESS
})

export const callRegisterScreenError = () => ({
  type: types.REGISTER_SCREEN_ERROR
})

export function callRegisterScreenItemAdd(product_id, lat, lng) { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
    let worker_name = realm.objectForPrimaryKey('ConfigData', 'profile_name').value;
    let worker_number = realm.objectForPrimaryKey('ConfigData', 'profile_number').value;
    dispatch(callRegisterScreenLoading());
    return fetch('http://just-dustbin.herokuapp.com/api/v1/dustbins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "dustbin": {
          "name": "BinNo-"+product_id,
          "worker": worker_name,
          "city": "Bangalore",
          "support_number": worker_number,
          "status": 0,
          "gps_latitude": lat,
          "gps_longitude": lng,
          "unique_id": parseInt(product_id)
         }
      })
    })
    .then(response => {
      if((response.status === 200)||(response.status === 400)||(response.status === 401)) {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);
      if(!json.hasOwnProperty('errors')) {
        dispatch(callRegisterScreenSuccess());
      }
      else {
        if(json.errors[0]==="Invalid token.") {
          dispatch(callRegisterScreenError());
        }
        else {
          dispatch(callRegisterScreenError());
        }
      }
    })
    .catch((error) => {console.log(error);dispatch(callRegisterScreenError());});
  }
}
