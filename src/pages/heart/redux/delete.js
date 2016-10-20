import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const deleteData = data => {
  return dispatch => {
    dispatch({
      type: 'HEART_DEL_BEGIN',
    });

    return fetch('/static/data/heartlist.json', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'HEART_DEL_SUCCESS',
          data: {},
        });
      }, )
      .catch(error => {
        dispatch({
          type: 'HEART_DEL_FAILURE',
          error,
        });
      });

  }
}

export const dismissDelError = () => {
  return {
    type: 'HEART_DEL_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'HEART_DEL_BEGIN':
      return update(state, {
        heart: {
          delPending: { $set: true }
        }
      });

    case 'HEART_DEL_SUCCESS':
      return update(state, {
        heart: {
          needReloadList: { $set: true },
          delPending: { $set: false }
        }
      });

    case 'HEART_DEL_FAILURE':
      return update(state, {
        heart: {
          delPending: { $set: false },
          delError: { $set: action.error }
        }
      });

    case 'HEART_DEL_DISMISS_ERROR':
      return update(state, {
        heart: {
          delError: { $set: null }
        }
      });

    default:
      return state;
  }
}
