import { useState, useCallback } from "react"
import useFetchRequest from "../hooks/useFetchRequest"
import { getCity } from "../services/api"
import { handleError } from "../services/errors"
import FavoritesListItemLoading from "./FavoritesListItemLoading"

const FavoritesListItem = ({ id }) => {
  const [cityData, setCityData] = useState({})
  const [error, setError] = useState(false)

  // TODO: make this into custom hook
  const getCityData = useCallback(
    () => {
      getCity(id)
      .then(resp => {
        // 500 error code come back as false positive 
        if (resp.statusCode === 500) {
          setError(true)
          handleError(resp)
        } else {
          if (error === true) setError(false)
          setCityData(resp)
        }
      })
      .catch(error => {
        // 500 error code wont be caught here
        handleError(error)
      })
    }, [id, error]
  )

  const renderListItemComponent = () => {
    if (error) {
      // TODO error component here
      return <div>Error...</div>
    }
    if (cityData.country) {
      // TODO render normal component here 
      return <div>Place city data here</div>
    }
    return <FavoritesListItemLoading />
  }

  useFetchRequest(getCityData)

  return (
    <>
      {renderListItemComponent()}
    </>
  )
}

export default FavoritesListItem