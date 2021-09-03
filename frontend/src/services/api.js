const url = "http://localhost:3030/"
const citiesUrl = url + 'cities'

export const getCities = (searchTerm = '', offset = 0) => {
  const queryPrefix = '?query',
    filterPrefix = '&filter=',
    limit = '&limit=10',
    offsetPrefix = '&offset='

  const CreateCitiesUrlWithQuery = () => {
    return citiesUrl + queryPrefix + 
      filterPrefix + searchTerm + 
      limit + offsetPrefix + offset
  }

  return fetch(CreateCitiesUrlWithQuery())
  .then(data => data.json())
}