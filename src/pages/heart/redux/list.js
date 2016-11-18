import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const fetchList = () => {
  return (dispatch) => {

    dispatch({
      type: 'OPT_BEGIN',
    });

    return fetch('/backend/heart/30')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_HEART_LIST_SUCCESS',
          data,
        });
        dispatch({
          type: 'OPT_SUCCESS',
        });
      })
      .catch(error => {
        dispatch({
          type: 'OPT_FAILURE',
          error
        });
      });
  };
}

export function reducer(state, action) {
  switch (action.type) {

    case 'FETCH_HEART_LIST_SUCCESS':
      return update(state, {
        heart: {
          needReloadList: { $set: false },
          listData: { $set: action.data },
        },
      });

    default:
      return state;
  }
}
