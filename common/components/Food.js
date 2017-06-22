import React from 'react'
import * as ReactRedux from 'react-redux'
import PropTypes from "prop-types";
import * as Actions from '../actions/Food'

class Food extends React.Component {
  // After mounting refresh the list to make sure it is current
  componentDidMount() {
    this.props.dispatch(Actions.refreshFoodList());
  }
  noFoodTrucksMessage() {
    if (0 === this.props.list.length) {
      return (<li>NO FOOD TRUCK DATA AVAILABLE</li>);
    }
  }
  
  render() {
    return (
      <ul>
        {this.noFoodTrucksMessage()}
        {this.props.list.map(item => 
          <li key={item.location}>
            {item.location}
            <ul>
              {item.truckList.map(truck => 
                <li key={truck}>{truck}</li>
              )}
            </ul>
          </li>
        )}
      </ul>
    )
  }
}

// Define props for the Component
Food.propTypes = {
  list: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

// Wire up ReactRedux
const mapStateToProps = (state) => ({
  list: state.food
})
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}
Food = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Food)

export default Food