const handlePreferencesOffset = (state = 0, action) => {
  switch(action.type) {
    case "UPDATE_PREFERENCES_OFFSET":
      return state + action.payload

    default: 
      return state
  }
}

export default handlePreferencesOffset