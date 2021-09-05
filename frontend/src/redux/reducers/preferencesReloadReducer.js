const handlePreferencesReload = (state = false, action) => {
  switch (action.type) {
    case "START_RELOAD":
      return action.payload

    case "SET_PREFERENCES":
      return false

    default: 
      return state
  }
}

export default handlePreferencesReload