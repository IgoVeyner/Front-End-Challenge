import { useState, useCallback } from "react"
import useGetCityData from "../hooks/useGetCityData"
import { getCity } from "../services/api"
import { handleFavoritesItemError } from "../services/errors"
import FavoritesListItem from "./FavoritesListItem"
import FavoritesListItemError from "./FavoritesListItemError"
import FavoritesListItemLoading from "./FavoritesListItemLoading"

const FavoritesListItemContainer = ({ id }) => {
  const [busy, setBusy] = useState(true)
  const [cityData, setCityData] = useState({})
  const [error, setError] = useState(false)

  // TODO: make this into custom hook
  const getCityData = useCallback(
    () => {
      setError(false)
      getCity(id)
      .then(resp => {
        // 500 error code come back as false positive 
        if (resp.statusCode === 500) {
          setError(true)
          handleFavoritesItemError(resp, id)
        } else {
          setBusy(false)
          setCityData(resp)
        }
      })
      .catch(error => {
        // 500 error code wont be caught here
        handleFavoritesItemError(error, id)
        setBusy(false)
        setError(true)
      })
    }, [id]
  )

  const renderListItemComponent = () => {
    if (error) return <FavoritesListItemError onPress={getCityData} />
    if (busy) return <FavoritesListItemLoading />
    return <FavoritesListItem city={cityData} />
  }

  useGetCityData(getCityData, error)

  return (
    <>
      {renderListItemComponent()}
    </>
  )
}

export default FavoritesListItemContainer