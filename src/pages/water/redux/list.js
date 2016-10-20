import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const fetchList = () => {
  return (dispatch) => {

    dispatch({
      type: 'FETCH_WATER_LIST_BEGIN',
    });

    return fetch('/static/data/waterlist.json')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_WATER_LIST_SUCCESS',
          data,
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_WATER_LIST_FAILURE',
          error
        });
      });
  };
}

export const dismissfetchListError = () => {
  return {
    type: 'FETCH_WATER_LIST_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_WATER_LIST_BEGIN':
      return update(state, {
        water: {
          listPending: { $set: true }
        }
      });

    case 'FETCH_WATER_LIST_SUCCESS':
      return update(state, {
        water: {
          needReloadList: { $set: false },
          listData: { $set: action.data },
          listPending: { $set: false },
        }
      });

    case 'FETCH_WATER_LIST_FAILURE':
      return update(state, {
        water: {
          listPending: { $set: false },
          listError: { $set: action.error }
        }
      });

    case 'FETCH_WATER_LIST_DISMISS_ERROR':
      return update(state, {
        water: {
          listError: { $set: null }
        }
      });

    default:
      return state;
  }
}
