import update from 'react/lib/update'

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

export const dismissOptError = () => {
  return {
    type: 'DISMISS_OPT_ERROR',
  };
}

export const commonActions = {
  changeHeader,
  changeFooter,
  changeHeaderAndFooter,
  dismissOptError,
}

const initialState = {
  headerTitle: '',
  selectedIndex: 0,
  pending: false,
  optError: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_HEADER_TITLE':
      return update(state, {
        headerTitle: { $set: action.headerTitle }
      })
    case 'CHANGE_FOOTER_INDEX':
      return update(state, {
        selectedIndex: { $set: action.selectedIndex }
      });
    case 'CHANGE_HEADER_AND_FOOTER':
      return update(state, {
        headerTitle: { $set: action.headerTitle },
        selectedIndex: { $set: action.selectedIndex },
      });

    case 'OPT_BEGIN':
      return update(state, {
        pending: { $set: true },
      });
    case 'OPT_SUCCESS':
      return update(state, {
        pending: { $set: false },
      });
    case 'OPT_FAILURE':
      return update(state, {
        pending: { $set: false },
        optError: { $set: action.error },
      });

    case 'DISMISS_OPT_ERROR':
      return update(state, {
        optError: { $set: null }
      });
    default:
      return state;
  }
}
