import * as Types from '../actions/Types'

const Neighborhood = (state, action) => {
  // Setup a default for the state
  state = state || {selected: '', list: []}
  // Clone the state to keep the method pure
  state = JSON.parse(JSON.stringify(state));

  // Default to Back Bay if not set
  if ('' === state.selected) {
    state.selected = 'back-bay';
  }
  
  // Process actions
  switch (action.type) {
    case Types.REFRESH_NEIGHBORHOOD_LIST:
      state.list = action.payload;
      break;
    case Types.SET_SELECTED_NEIGHBORHOOD:
      state.selected = action.payload;
      break;
  }
  
  return state;
}

export default Neighborhood