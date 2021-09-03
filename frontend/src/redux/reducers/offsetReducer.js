const handleOffset = (state = 0, action) => {
  switch(action.type) {
    case "UPDATE_OFFSET":
      return state + action.payload

    case "RESET_OFFSET":
      return action.payload

    default: 
      return state
  }
}

export default handleOffset