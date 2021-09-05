import { useState, useCallback } from "react"
import useFetchRequest from "../hooks/useFetchRequest"
import { getCity } from "../services/api"

const FavoritesListItem = ({ id }) => {
  const [cityData, setCityData] = useState({})

  const getCityData = useCallback(
    () => {
      getCity(id)
      .then(data => {
        // TODO: error handling here
        console.log(data)
      })
      .catch(error => {
        // TODO: error handling here even though 500 error code wont be caught here
        console.log(error)
      })
    }, [id]
  )

  useFetchRequest(getCityData)

  return (
    <div>
       {id}
    </div>
  )
}

export default FavoritesListItem