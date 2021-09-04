import { combineReducers } from "redux"
import handleCities from './citiesReducer.js'
import handleLoading from "./loadingReducer.js"
import handleOffset from './offsetReducer.js'
import handleSearchError from "./searchErrorReducer.js"

const rootReducer = combineReducers({
  cities: handleCities,
  offset: handleOffset,
  loading: handleLoading,
  searchError: handleSearchError,
})

export default rootReducer