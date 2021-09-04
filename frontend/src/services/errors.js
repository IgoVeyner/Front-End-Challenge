export const handleError = (response, callback) => {
  console.error(
    "--- Search Error! --- \n", 
    `Status-Code: ${response.statusCode} \n`,
    `Error: ${response.error} \n`,
    `Message: ${response.message} \n`,
  )
  callback()
}