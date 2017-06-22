import * as Types from '../actions/Types'
import * as Food from '../actions/Food'

export const changeNeighborhood = (neighborhood) => {
  return (dispatch) => {
    dispatch(Food.refreshFoodList(neighborhood, '', ''));
    dispatch(setSelectedNeighborhood(neighborhood));
  };
};

export const setSelectedNeighborhood = (neighborhood) => ({
  type: Types.SET_SELECTED_NEIGHBORHOOD,
  payload: neighborhood,
});

export const refreshNeighborhoodList = () => {
  return (dispatch) => {
    fetch('/api/neighborhoods')
      .then((response) => response.json())
      .then((neighborhoodList) => dispatch(refreshNeighborhoodListComplete(neighborhoodList)));
  };
};

export const refreshNeighborhoodListComplete = (neighborhoodList) => ({
  type: Types.REFRESH_NEIGHBORHOOD_LIST,
  payload: neighborhoodList,
});