import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const add = data => {
  return dispatch => {
    dispatch({
      type: 'HEART_ADD_BEGIN',
    });

    return fetch('/static/data/heartlist.json', {
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
          type: 'HEART_ADD_SUCCESS',
          data: {},
        });
      }, )
      .catch(error => {
        dispatch({
          type: 'HEART_ADD_FAILURE',
          error,
        });
      });

  }
}

export const dismissAddError = () => {
  return {
    type: 'HEART_ADD_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'HEART_ADD_BEGIN':
      return update(state, {
        heart: {
          addPending: { $set: true }
        }
      });

    case 'HEART_ADD_SUCCESS':
      return update(state, {
        heart: {
          needReloadList: { $set: true },
          addPending: { $set: false }
        }
      });

    case 'HEART_ADD_FAILURE':
      return update(state, {
        heart: {
          addPending: { $set: false },
          addError: { $set: action.error }
        }
      });

    case 'HEART_ADD_DISMISS_ERROR':
      return update(state, {
        heart: {
          addError: { $set: null }
        }
      });

    default:
      return state;
  }
}
