import fetch from 'isomorphic-fetch'

export const fetchList = () => {
  return (dispatch) => {

    dispatch({
      type: 'FETCH_LIST_BEGIN',
    });

    return fetch('/static/data/waterlist.json')
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'FETCH_LIST_SUCCESS',
          data: json,
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_LIST_FAILURE',
          data: {
            error,
          },
        });
      });
  };
}

export const dismissfetchListError = () => {
  return {
    type: 'FETCH_LIST_DISMISS_ERROR',
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_LIST_BEGIN':
      return {
        ...state,
        fetchListPending: true,
      };

    case 'FETCH_LIST_SUCCESS':
      return {
        ...state,
        needReloadList: false,
        listData: action.data,
        fetchListPending: false,
      };

    case 'FETCH_LIST_FAILURE':
      return {
        ...state,
        fetchListPending: false,
        fetchListError: action.data.error,
      };

    case 'FETCH_LIST_DISMISS_ERROR':
      return {
        ...state,
        fetchListError: null,
      };

    default:
      return state;
  }
}
