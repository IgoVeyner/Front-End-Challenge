export const setLoading = () => {
  return {
    type: "FETCHING_PREFERENCES",
    payload: true
  }
}

export const finishLoading = () => {
  return {
    type: "FINISH_LOADING_PREFERENCES",
    payload: false
  }
}