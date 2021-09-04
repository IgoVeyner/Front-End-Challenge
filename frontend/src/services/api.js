const url = "http://localhost:3030/"
const citiesUrl = url + 'cities'
const preferencesUrl = url + 'preferences/cities'

const queryPrefix = '?query'
const filterPrefix = '&filter='
const limit = '&limit=10'
const offsetPrefix = '&offset='

const parseData = (data) => data.json() 

export const getCities = (searchTerm = '', offset = 0) => {
  const createFullCitiesUrl = () => {
    return citiesUrl + queryPrefix + 
      filterPrefix + searchTerm + 
      limit + offsetPrefix + offset
  }

  return fetch(createFullCitiesUrl())
    .then(parseData)
}

export const getPreferences = (offset = 0) => {
  const createFullPreferencesUrl = () => {
    return preferencesUrl + queryPrefix +
      limit + offsetPrefix + offset
  }

  return fetch(createFullPreferencesUrl())
    .then(parseData)
}

export const updatePreferences = (preferences, task) => {
  const taskBool = task === "ADD" ? true : false 
  const newPreferences = {}

  preferences.forEach(key => {
    newPreferences[key] = taskBool
  })

  return fetch(preferencesUrl, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json', 
      'Accepts': 'application/json'
    },
    body: JSON.stringify(newPreferences)
  })
} 