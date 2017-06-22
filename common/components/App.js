import React from 'react'
import Day from './Day'
import Neighborhood from './Neighborhood'
import Time from './Time'
import Food from './Food'

class App extends React.Component {  
  render() {
    return (
      <div>
        <Day />
        <Neighborhood />
        <Time />
        <Food />
      </div>
    )
  }
}

export default App