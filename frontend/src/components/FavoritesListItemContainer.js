import { useState } from "react"
import useGetCityData from "../hooks/useGetCityData"
import FavoritesListItem from "./FavoritesListItem"
import FavoritesListItemLoading from "./FavoritesListItemLoading"
import FavoritesListItemError from "./FavoritesListItemError"

const FavoritesListItemContainer = ({ id }) => {
  const [busy, setBusy] = useState(true)
  const [cityData, setCityData] = useState({})
  const [error, setError] = useState(false)

  const makeBusy = () => setBusy(true)

  const renderListItemComponent = () => {
    if (busy) return <FavoritesListItemLoading />
    if (error) return <FavoritesListItemError onPress={makeBusy} />
    return <FavoritesListItem city={cityData} />
  }

  useGetCityData(id, setBusy, setError, setCityData, busy)

  return (
    <>
      {renderListItemComponent()}
    </>
  )
}

export default FavoritesListItemContainer