import React from 'react'
import * as ReactRedux from 'react-redux'
import PropTypes from "prop-types";
import * as Actions from '../actions/Time'

class Time extends React.Component {
  // After mounting refresh the list to make sure it is current
  componentDidMount() {
    this.props.dispatch(Actions.refreshTimeList());
  }
  
  render() {
    return (
      <div>
        <label htmlFor="time">Time: </label>
        <select onChange={this.props.change} id="time" name="time" value={this.props.selected}>
          {this.props.list.map(time =>
            <option key={time.id} value={time.id}>{time.name}</option>
          )}
        </select>
      </div>
    )
  }
}

// Define props for the Component
Time.propTypes = {
  selected: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

// Wire up ReactRedux
const mapStateToProps = (state) => ({
  selected: state.time.selected,
  list: state.time.list,
})
const mapDispatchToProps = (dispatch) => {
  return {
    change: (event) => {
      dispatch(Actions.changeTime(event.target.value));
    },
    dispatch: dispatch,
  }
}
Time = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Time)

export default Time