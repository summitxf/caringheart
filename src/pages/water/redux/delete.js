import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const deleteData = data => {
  return dispatch => {
    dispatch({
      type: 'OPT_BEGIN',
    });

    return fetch('/backend/water', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          dispatch({
            type: 'OPT_FAILURE',
            error: { message: response.statusText },
          });
        } else {
          dispatch({
            type: 'WATER_DEL_SUCCESS',
          });
          dispatch({
            type: 'OPT_SUCCESS',
          });
        }
      })
      .catch(error => {
        dispatch({
          type: 'OPT_FAILURE',
          error,
        });
      });

  }
}

export function reducer(state, action) {
  switch (action.type) {

    case 'WATER_DEL_SUCCESS':
      return update(state, {
        water: {
          needReloadList: { $set: true },
        },
      });

    default:
      return state;
  }
}
