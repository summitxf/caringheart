import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const deleteData = data => {
  return dispatch => {
    dispatch({
      type: 'WATER_DEL_BEGIN',
    });

    return fetch('/static/data/waterlist.json', {
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
          type: 'WATER_DEL_SUCCESS',
          data: {},
        });
      }, )
      .catch(error => {
        dispatch({
          type: 'WATER_DEL_FAILURE',
          error,
        });
      });

  }
}

export const dismissDelError = () => {
  return {
    type: 'WATER_DEL_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'WATER_DEL_BEGIN':
      return update(state, {
        water: {
          delPending: { $set: true }
        }
      });

    case 'WATER_DEL_SUCCESS':
      return update(state, {
        water: {
          needReloadList: { $set: true },
          delPending: { $set: false }
        }
      });

    case 'WATER_DEL_FAILURE':
      return update(state, {
        water: {
          delPending: { $set: false },
          delError: { $set: action.error }
        }
      });

    case 'WATER_DEL_DISMISS_ERROR':
      return update(state, {
        water: {
          delError: { $set: null }
        }
      });

    default:
      return state;
  }
}
