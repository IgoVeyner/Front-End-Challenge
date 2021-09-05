export const updateSearchTerm = (searchTerm) => {
  return {
    type: "UPDATE_SEARCH_TERM",
    payload: searchTerm 
  }
}