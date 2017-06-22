import * as Types from '../actions/Types'

const Food = (state = [], action) => {  
  // Process actions
  switch (action.type) {
    case Types.REFRESH_FOOD_LIST:
      state = action.payload;
      break;
  }
    
  return state;
}

export default Food