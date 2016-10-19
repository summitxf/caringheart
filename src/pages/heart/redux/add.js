import fetch from 'isomorphic-fetch'

export const add = data => {
  return dispatch => {
    dispatch({
      type: 'ADD_BEGIN',
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
          type: 'ADD_SUCCESS',
          data: {},
        });
      }, )
      .catch(error => {
        dispatch({
          type: 'ADD_FAILURE',
          data: {
            error,
          },
        });
      });

  }
}

export const dismissAddError = () => {
  return {
    type: 'ADD_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_BEGIN':
      return {
        ...state,
        addPending: true,
      };

    case 'ADD_SUCCESS':
      return {
        ...state,
        needReloadList: true,
        addPending: false,
      };

    case 'ADD_FAILURE':
      return {
        ...state,
        addPending: false,
        addError: action.data.error,
      };

    case 'ADD_DISMISS_ERROR':
      return {
        ...state,
        addError: null,
      };

    default:
      return state;
  }
}
