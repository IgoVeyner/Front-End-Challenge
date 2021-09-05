import { combineReducers } from "redux"
import handleCities from './citiesReducer.js'
import handleSearchLoading from "./searchLoadingReducer.js"
import handleOffset from './offsetReducer.js'
import handleSearchError from "./searchErrorReducer.js"
import handlePreferences from "./preferencesReducer.js"
import handleSearchTerm from "./searchTermReducer.js"
import handlePreferencesReload from "./preferencesReloadReducer.js"

const rootReducer = combineReducers({
  cities: handleCities,
  offset: handleOffset,
  searchLoading: handleSearchLoading,
  searchError: handleSearchError,
  preferences: handlePreferences,
  searchTerm: handleSearchTerm,
  preferenceReload: handlePreferencesReload,
})

export default rootReducer