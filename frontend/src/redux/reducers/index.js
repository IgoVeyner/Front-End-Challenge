import { combineReducers } from "redux"
import handleCities from './citiesReducer.js'
import handleSearchLoading from "./searchLoadingReducer.js"
import handleOffset from './offsetReducer.js'
import handleSearchError from "./searchErrorReducer.js"
import handlePreferences from "./preferencesReducer.js"
import handleSearchTerm from "./searchTermReducer.js"
import handlePreferencesReload from "./preferencesReloadReducer.js"
import handlePreferencesOffset from "./preferencesOffsetReducer.js"

const rootReducer = combineReducers({
  cities: handleCities,
  offset: handleOffset,
  searchLoading: handleSearchLoading,
  searchError: handleSearchError,
  preferences: handlePreferences,
  searchTerm: handleSearchTerm,
  preferencesReload: handlePreferencesReload,
  preferencesOffset: handlePreferencesOffset,
})

export default rootReducer