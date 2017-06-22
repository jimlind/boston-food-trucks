import * as Types from '../actions/Types'
import * as Food from '../actions/Food'

export const changeTime = (time) => {
  return (dispatch) => {
    dispatch(Food.refreshFoodList('', '', time));
    dispatch(setSelectedTime(time));
  };
};

export const setSelectedTime = (time) => ({
  type: Types.SET_SELECTED_TIME,
  payload: time,
});

export const refreshTimeList = () => {
  return (dispatch) => {
    fetch('/api/times')
      .then((response) => response.json())
      .then((timeList) => dispatch(refreshTimeListComplete(timeList)));
  };
};

export const refreshTimeListComplete = (timeList) => ({
  type: Types.REFRESH_TIME_LIST,
  payload: timeList,
});