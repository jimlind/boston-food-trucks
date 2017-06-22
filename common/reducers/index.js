import * as Redux from 'redux'
import Day from './Day'
import Neighborhood from './Neighborhood'
import Time from './Time'
import Food from './Food'

const rootReducer = Redux.combineReducers({
  day: Day,
  neighborhood: Neighborhood,
  time: Time,
  food: Food,
})

export default rootReducer
