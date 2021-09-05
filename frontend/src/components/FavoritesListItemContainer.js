import { useState, useCallback } from "react"
import useGetCityData from "../hooks/useGetCityData"
import { getCity } from "../services/api"
import { handleFavoritesItemError } from "../services/errors"
import FavoritesListItem from "./FavoritesListItem"
import FavoritesListItemError from "./FavoritesListItemError"
import FavoritesListItemLoading from "./FavoritesListItemLoading"

const FavoritesListItemContainer = ({ id }) => {
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
          handleFavoritesItemError(resp, id)
        } else {
          if (error === true) setError(false)
          setCityData(resp)
        }
      })
      .catch(error => {
        // 500 error code wont be caught here
        handleFavoritesItemError(error, id)
      })
    }, [id, error]
  )

  const renderListItemComponent = () => {
    if (error) return <FavoritesListItemError onPress={getCityData} />
    if (cityData.country) return <FavoritesListItem city={cityData} />
    return <FavoritesListItemLoading />
  }

  useGetCityData(getCityData, error)

  return (
    <>
      {renderListItemComponent()}
    </>
  )
}

export default FavoritesListItemContainer