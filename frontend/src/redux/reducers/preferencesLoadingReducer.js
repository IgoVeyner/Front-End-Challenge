const handlePreferencesLoading = (state = false, action) => {
  switch (action.type) {
    case "FETCHING_PREFERENCES":
      return action.payload

    case "SET_PREFERENCES":
    case "PREFERENCES_ERROR":
      return false

    default:
      return state
  }
}

export default handlePreferencesLoading