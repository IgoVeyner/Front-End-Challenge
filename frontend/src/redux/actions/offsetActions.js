export const updateOffset = (number) => {
  return {
    type: "UPDATE_OFFSET",
    payload: number
  }
} 

export const resetOffset = () => {
  return {
    type: "RESET_OFFSET",
    payload: 0
  }
}