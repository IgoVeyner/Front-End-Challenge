const handleCities = (state = {}, action) => {
  switch(action.type) {
    case "SET_CITIES":
      return action.payload

    default: 
      return state
  }
}

export default handleCities