import initialState from './initialState';
import { reducer as login } from './login';
import { reducer as logout } from './logout';

const reducers = [
    login,
    logout,
];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {

        default:
            newState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
}

