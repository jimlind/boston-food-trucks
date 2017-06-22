import * as Types from '../actions/Types'
import * as Food from '../actions/Food'

export const changeDay = (day) => {
  return (dispatch) => {
    dispatch(Food.refreshFoodList('', day, ''));
    dispatch(setSelectedDay(day));
  };
};

export const setSelectedDay = (day) => ({
  type: Types.SET_SELECTED_DAY,
  payload: day,
});

export const refreshDayList = () => {
  return (dispatch) => {
    fetch('/api/days')
      .then((response) => response.json())
      .then((dayList) => dispatch(refreshDayListComplete(dayList)));
  };
};

export const refreshDayListComplete = (dayList) => ({
  type: Types.REFRESH_DAY_LIST,
  payload: dayList,
});