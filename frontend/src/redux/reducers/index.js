import { combineReducers } from "redux"
import handleCities from './citiesReducer.js'
import handleOffset from './offsetReducer.js'

const rootReducer = combineReducers({
  cities: handleCities,
  offset: handleOffset,
})

export default rootReducer