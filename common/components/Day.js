import React from 'react'
import * as ReactRedux from 'react-redux'
import PropTypes from "prop-types";
import * as Actions from '../actions/Day'

class Day extends React.Component {
  // After mounting refresh the list to make sure it is current
  componentDidMount() {
    this.props.dispatch(Actions.refreshDayList());
  }
  
  render() {
    return (
      <div>
        <label htmlFor="day">Day: </label>
        <select onChange={this.props.change} id="day" name="day" value={this.props.selected}>
          {this.props.list.map(day =>
            <option key={day.id} value={day.id}>{day.name}</option>
          )}
        </select>
      </div>
    )
  }
}

// Define props for the Component
Day.propTypes = {
  selected: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

// Wire up ReactRedux
const mapStateToProps = (state) => ({
  selected: state.day.selected,
  list: state.day.list,
})
const mapDispatchToProps = (dispatch) => {
  return {
    change: (event) => {
      dispatch(Actions.changeDay(event.target.value));
    },
    dispatch: dispatch,
  }
}
Day = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Day)

export default Day