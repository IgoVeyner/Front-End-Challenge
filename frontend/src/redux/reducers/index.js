import { combineReducers } from "redux"
import handleCities from './citiesReducer.js'

const rootReducer = combineReducers({
  cities: handleCities
})

export default rootReducer