const handleOffset = (state = 0, action) => {
  switch(action.type) {
    case "UPDATE_OFFSET":
      return state + action.payload

    default: 
      return state
  }
}

export default handleOffset