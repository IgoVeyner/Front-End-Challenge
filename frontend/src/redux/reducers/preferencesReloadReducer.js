const handlePreferencesReload = (state = false, action) => {
  switch (action.type) {
    case "START_PREFERENCES_RELOAD":
      return true

    case "END_PREFERENCES_RELOAD":
      return false 

    default: 
      return state
  }
}

export default handlePreferencesReload