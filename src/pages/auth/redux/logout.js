import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT_SUCCESS',
    });

    const promise = new Promise((resolve, reject) => {
      localStorage.removeItem('userToken')

      resolve();
    });

    return promise;
  };
}

export function reducer(state, action) {
  switch (action.type) {

    case 'LOGOUT_SUCCESS':
      return update(state, {
        auth: {
          isAuth: { $set: false },
          token: { $set: "" },
        },
      });

    default:
      return state;
  }
}
