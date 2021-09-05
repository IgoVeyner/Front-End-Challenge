const handlePreferencesReload = (state = false, action) => {
  switch (action.type) {
    case "START_RELOAD":
      return true

    case "END_RELOAD":
      return false 

    default: 
      return state
  }
}

export default handlePreferencesReload