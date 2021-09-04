const handleLoading = (state = false, action) => {
  switch (action.type) {
    case "FETCHING":
      return action.payload

    case "SET_CITIES":
    case "SEARCH_ERROR":
      return false

    default:
      return state
  }
}

export default handleLoading