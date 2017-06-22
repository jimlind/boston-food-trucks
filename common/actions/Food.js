import * as Types from '../actions/Types'

export const refreshFoodList = (neighborhood, day, time) => {
  return (dispatch, getState) => {
    const state = getState();
    neighborhood = neighborhood || state.neighborhood.selected
    day = day || state.day.selected
    time = time || state.time.selected
    
    fetch('/api/food/neighborhood/' + neighborhood + '/day/' + day + '/time/' + time)
      .then((response) => response.json())
      .then((foodList) => dispatch(refreshFoodListComplete(foodList)));
  };
};

export const refreshFoodListComplete = (foodList) => ({
  type: Types.REFRESH_FOOD_LIST,
  payload: foodList,
});