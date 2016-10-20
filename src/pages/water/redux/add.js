import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const add = data => {
  return dispatch => {
    dispatch({
      type: 'WATER_ADD_BEGIN',
    });

    return fetch('/static/data/waterlist.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'WATER_ADD_SUCCESS',
          data: {},
        });
      }, )
      .catch(error => {
        dispatch({
          type: 'WATER_ADD_FAILURE',
          error,
        });
      });

  }
}

export const dismissAddError = () => {
  return {
    type: 'WATER_ADD_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'WATER_ADD_BEGIN':
      return update(state, {
        water: {
          addPending: { $set: true }
        }
      });

    case 'WATER_ADD_SUCCESS':
      return update(state, {
        water: {
          needReloadList: { $set: true },
          addPending: { $set: false }
        }
      });

    case 'WATER_ADD_FAILURE':
      return update(state, {
        water: {
          addPending: { $set: false },
          addError: { $set: action.error }
        }
      });

    case 'WATER_ADD_DISMISS_ERROR':
      return update(state, {
        water: {
          addError: { $set: null }
        }
      });

    default:
      return state;
  }
}
