const handleSearchError = (state = false, action) => {
  switch (action.type) {
    case "SEARCH_ERROR":
      return action.payload

    case "SET_CITIES":
      return false

    default:
      return state
  }
}

export default handleSearchError