import React from 'react'
import * as ReactRedux from 'react-redux'
import PropTypes from "prop-types";
import * as Actions from '../actions/Neighborhood'

class Neighborhood extends React.Component {
  // After mounting refresh the list to make sure it is current
  componentDidMount() {
    this.props.dispatch(Actions.refreshNeighborhoodList());
  }
  
  render() {
    return (
      <div>
        <label htmlFor="neighborhood">Neighborhood: </label>
        <select onChange={this.props.change} id="neighborhood" name="neighborhood" value={this.props.selected}>
          {this.props.list.map(neighborhood =>
            <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
          )}
        </select>
      </div>
    )
  }
}

// Define props for the Component
Neighborhood.propTypes = {
  selected: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

// Wire up ReactRedux
const mapStateToProps = (state) => ({
  selected: state.neighborhood.selected,
  list: state.neighborhood.list,
})
const mapDispatchToProps = (dispatch) => {
  return {
    change: (event) => {
      dispatch(Actions.changeNeighborhood(event.target.value));
    },
    dispatch: dispatch,
  }
}
Neighborhood = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Neighborhood)

export default Neighborhood