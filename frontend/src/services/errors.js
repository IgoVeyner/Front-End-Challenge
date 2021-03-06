export const handleError = (response, callback = null) => {
  console.error(
    "--- Search Error! --- \n", 
    `Status-Code: ${response.statusCode} \n`,
    `Error: ${response.error} \n`,
    `Message: ${response.message} \n`,
  )
  if (callback) {
    callback()
  }
}

export const handleCheckboxError = (response, task) => {
  console.error(
    `--- ${task} from Favorites Error! --- \n`, 
    `Status-Code: ${response.status} \n`,
    `Error: ${response.statusText} \n`,
  )
}

export const handleFavoritesError = (response) => {
  console.error(
    "--- Favorites Error! --- \n", 
    `Status-Code: ${response.statusCode} \n`,
    `Error: ${response.error} \n`,
    `Message: ${response.message} \n`,
  )
}

export const handleFavoritesItemError = (response, id) => {
  console.error(
    `--- Get City ${id} Error! --- \n`, 
    `Status-Code: ${response.statusCode} \n`,
    `Error: ${response.error} \n`,
    `Message: ${response.message} \n`,
  )
}