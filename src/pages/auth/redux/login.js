import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

import { getHeader } from '../../../utils'

export const login = data => {
    return dispatch => {
        dispatch({
            type: 'OPT_BEGIN',
        });

        return fetch('/backend/auth/login', {
            method: 'POST',
            headers: getHeader(),
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                dispatch({
                    type: 'OPT_FAILURE',
                    error: { message: response.statusText },
                });
            } else {
                response.json().then(data => {
                    localStorage.setItem('userToken', data.token)
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        data: data.token,
                    });
                    dispatch({
                        type: 'OPT_SUCCESS',
                    });
                })
            }
        }).catch(error => {
            dispatch({
                type: 'OPT_FAILURE',
                error,
            });
        });
    }
}

export function reducer(state, action) {
    switch (action.type) {

        case 'LOGIN_SUCCESS':
            return update(state, {
                auth: {
                    isAuth: { $set: true },
                    token: { $set: action.data },
                },
            });

        default:
            return state;
    }
}
