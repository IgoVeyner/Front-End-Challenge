import { combineReducers } from "redux"
import handleCities from './citiesReducer.js'
import handlePreferencesLoading from "./preferencesLoadingReducer.js"
import handleSearchLoading from "./searchLoadingReducer.js"
import handleOffset from './offsetReducer.js'
import handleSearchError from "./searchErrorReducer.js"

const rootReducer = combineReducers({
  cities: handleCities,
  offset: handleOffset,
  searchLoading: handleSearchLoading,
  searchError: handleSearchError,
  preferencesLoading: handlePreferencesLoading,
})

export default rootReducer