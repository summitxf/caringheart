import fetch from 'isomorphic-fetch'
import update from 'react/lib/update'

import { getHeader } from '../../../utils'

export const fetchList = () => {
    return (dispatch) => {

        dispatch({
            type: 'OPT_BEGIN',
        });

        return fetch('/backend/water/30', {
            method: 'GET',
            headers: getHeader(true)
        }).then(response => {
            if (!response.ok) {
                dispatch({
                    type: 'OPT_FAILURE',
                    error: { message: response.statusText },
                });
            }
            return response.json();
        }).then(data => {
            dispatch({
                type: 'FETCH_WATER_LIST_SUCCESS',
                data: data,
            });
            dispatch({
                type: 'OPT_SUCCESS',
            });
        }).catch(error => {
            dispatch({
                type: 'FETCH_WATER_LIST_FAIL'
            });
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
        case 'FETCH_WATER_LIST_FAIL':
            return update(state, {
                water: {
                    needReloadList: { $set: false }
                }
            });
        default:
            return state;
    }
}
