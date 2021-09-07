import { useState } from "react"
import useGetCityData from "../hooks/useGetCityData"
import FavoritesListItem from "./FavoritesListItem"
import FavoritesListItemLoading from "./FavoritesListItemLoading"

const FavoritesListItemContainer = ({ id }) => {
  const [busy, setBusy] = useState(true)
  const [cityData, setCityData] = useState({})
  const [error, setError] = useState(false)

  const renderListItemComponent = () => {
    if (busy) return <FavoritesListItemLoading />

    // TODO: reset component on press 
    // if (error) return <FavoritesListItemError onPress={getCityData} />
    return <FavoritesListItem city={cityData} />
  }

  useGetCityData(id, setBusy, setError, setCityData)

  return (
    <>
      {renderListItemComponent()}
    </>
  )
}

export default FavoritesListItemContainer