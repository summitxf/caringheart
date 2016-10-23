import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const deleteData = data => {
  return dispatch => {
    dispatch({
      type: 'OPT_BEGIN',
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
        dispatch({
          type: 'OPT_SUCCESS',
        });
      }, )
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

    case 'HEART_DEL_SUCCESS':
      return update(state, {
        heart: {
          needReloadList: { $set: true },
        },
      });

    default:
      return state;
  }
}
