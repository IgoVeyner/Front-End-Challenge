const url = "http://localhost:3030/"
const citiesUrl = url + 'cities'

export const getCities = (searchTerm = '', offset = 0) => {
  const queryPrefix = '?query',
    filterPrefix = '&filter=',
    limit = '&limit=10',
    offsetPrefix = '&offset='

  const CreateCitiesUrlWithQuery = () => {
    const convertedOffset = (offset * 10)

    return citiesUrl + queryPrefix + 
      filterPrefix + searchTerm + 
      limit + offsetPrefix + convertedOffset
  }

  return fetch(CreateCitiesUrlWithQuery())
  .then(data => data.json())
}