import initialState from './initialState';
import { reducer as add } from './add';
import { reducer as list } from './list';
import { reducer as del } from './delete';

const reducers = [
  add,
  list,
  del,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
