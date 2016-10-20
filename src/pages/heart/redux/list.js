import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const fetchList = () => {
  return (dispatch) => {

    dispatch({
      type: 'FETCH_HEART_LIST_BEGIN',
    });

    return fetch('/static/data/heartlist.json')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_HEART_LIST_SUCCESS',
          data,
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_HEART_LIST_FAILURE',
          error
        });
      });
  };
}

export const dismissfetchListError = () => {
  return {
    type: 'FETCH_HEART_LIST_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_HEART_LIST_BEGIN':
      return update(state, {
        heart: {
          listPending: { $set: true }
        }
      });

    case 'FETCH_HEART_LIST_SUCCESS':
      return update(state, {
        heart: {
          needReloadList: { $set: false },
          listData: { $set: action.data },
          listPending: { $set: false },
        }
      });

    case 'FETCH_HEART_LIST_FAILURE':
      return update(state, {
        heart: {
          listPending: { $set: false },
          listError: { $set: action.error }
        }
      });

    case 'FETCH_HEART_LIST_DISMISS_ERROR':
      return update(state, {
        heart: {
          listError: { $set: null }
        }
      });

    default:
      return state;
  }
}
