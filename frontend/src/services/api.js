const url = "http://localhost:3030/"
const citiesUrl = url + 'cities'
const preferencesUrl = url + 'preferences/cities'

const parseData = (data) => data.json() 

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
    .then(parseData)
}

export const getPreferences = () => {
  return fetch(preferencesUrl)
    .then(parseData)
}