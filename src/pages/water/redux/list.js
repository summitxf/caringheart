import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const fetchList = () => {
  return (dispatch) => {

    dispatch({
      type: 'OPT_BEGIN',
    });

    return fetch('/backend/water/7')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_WATER_LIST_SUCCESS',
          data,
        });
        dispatch({
          type: 'OPT_SUCCESS',
          data,
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

    case 'FETCH_WATER_LIST_SUCCESS':
      return update(state, {
        water: {
          needReloadList: { $set: false },
          listData: { $set: action.data },
        },
      });

    default:
      return state;
  }
}
