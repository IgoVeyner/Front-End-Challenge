import { useState } from "react"
import useCancelableFetch from "../hooks/useCancelableFetch"
import useGetCityData from "../hooks/useGetCityData"
import FavoritesListItem from "./FavoritesListItem"
import FavoritesListItemError from "./FavoritesListItemError"
import FavoritesListItemLoading from "./FavoritesListItemLoading"

const FavoritesListItemContainer = ({ id }) => {
  const [busy, setBusy] = useState(true)
  const [cityData, setCityData] = useState({})
  const [error, setError] = useState(false)

  const renderListItemComponent = () => {
    if (busy) return <FavoritesListItemLoading />
    if (error) return <FavoritesListItemError onPress={getCityData} />
    return <FavoritesListItem city={cityData} />
  }

  const getCityData = useGetCityData(id, setBusy, setError, setCityData)
  useCancelableFetch(getCityData)

  return (
    <>
      {renderListItemComponent()}
    </>
  )
}

export default FavoritesListItemContainer