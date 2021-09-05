const handlePreferencesReload = (state = false, action) => {
  switch (action.type) {
    case "START_RELOAD":
      return true

    case "SET_PREFERENCES":
      return false

    default: 
      return state
  }
}

export default handlePreferencesReload