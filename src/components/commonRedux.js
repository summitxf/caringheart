export const changeHeader = headerTitle => {
  return {
    type: 'CHANGE_HEADER_TITLE',
    headerTitle
  }
}

export const changeFooter = selectedIndex => {
  return {
    type: 'CHANGE_FOOTER_INDEX',
    selectedIndex
  }
}

export const changeHeaderAndFooter = (headerTitle, selectedIndex) => {
  return {
    type: 'CHANGE_HEADER_AND_FOOTER',
    headerTitle,
    selectedIndex
  }
}

export const commonActions = {
  changeHeader,
  changeFooter,
  changeHeaderAndFooter
}

export function reducer(state = { headerTitle: '', selectedIndex: 0 }, action) {
  switch (action.type) {
    case 'CHANGE_HEADER_TITLE':
      return {
        ...state,
        headerTitle: action.headerTitle,
      };
    case 'CHANGE_FOOTER_INDEX':
      return {
        ...state,
        selectedIndex: action.selectedIndex,
      };
    case 'CHANGE_HEADER_AND_FOOTER':
      return {
        ...state,
        headerTitle: action.headerTitle,
        selectedIndex: action.selectedIndex,
      };
    default:
      return state;
  }
}
