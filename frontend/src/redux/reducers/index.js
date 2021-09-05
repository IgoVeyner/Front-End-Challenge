import { combineReducers } from "redux"
import handleCities from './citiesReducer.js'
import handlePreferencesLoading from "./preferencesLoadingReducer.js"
import handleSearchLoading from "./searchLoadingReducer.js"
import handleOffset from './offsetReducer.js'
import handleSearchError from "./searchErrorReducer.js"
import handlePreferences from "./preferencesReducer.js"
import handleSearchTerm from "./searchTermReducer.js"

const rootReducer = combineReducers({
  cities: handleCities,
  offset: handleOffset,
  searchLoading: handleSearchLoading,
  searchError: handleSearchError,
  preferencesLoading: handlePreferencesLoading,
  preferences: handlePreferences,
  searchTerm: handleSearchTerm,
})

export default rootReducer