import Moment from 'moment-timezone';
import * as Types from '../actions/Types'

const Day = (state, action) => {
  // Setup a default for the state
  state = state || {selected: '', list: []}
  // Clone the state to keep the method pure
  state = JSON.parse(JSON.stringify(state));

  // Default to today if not set
  if ('' === state.selected) {
    state.selected = Moment.tz('America/New_York').format('dddd').toLowerCase();
  }
  
  // Process actions
  switch (action.type) {
    case Types.REFRESH_DAY_LIST:
      state.list = action.payload;
      break;
    case Types.SET_SELECTED_DAY:
      state.selected = action.payload;
      break;
  }
  
  return state;
}

export default Day