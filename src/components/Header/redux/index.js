export function changeHeader(headerTitle) {
  return {
    type: 'CHANGE_HEADER_TITLE',
    headerTitle
  }
}

export function reducer(state = { headerTitle: '' }, action) {
  switch (action.type) {
    case 'CHANGE_HEADER_TITLE':
      return {
        ...state,
        headerTitle: action.headerTitle,
      };
    default:
      return state;
  }
}
