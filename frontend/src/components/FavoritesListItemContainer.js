import { useState, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux'
import useFetchRequest from "../hooks/useFetchRequest"
import { getCity } from "../services/api"
import { handleFavoritesItemError } from "../services/errors"
import FavoritesListItem from "./FavoritesListItem"
import FavoritesListItemError from "./FavoritesListItemError"
import FavoritesListItemLoading from "./FavoritesListItemLoading"
import { startPreferenceReload } from '../redux/actions/preferencesReloadActions'
import { setPreferences } from '../redux/actions/preferencesActions'
import { updatePreferences } from '../services/api'

const FavoritesListItemContainer = ({ id }) => {
  const [busy, setBusy] = useState(true)
  const [cityData, setCityData] = useState({})
  const [error, setError] = useState(false)

  const favorites = useSelector(state => state.preferences)

  const dispatch = useDispatch() 

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

  const removeFromFavorites = useCallback(() => {
    const setNeedsReload = () => dispatch(startPreferenceReload())
    const updateFavorites = (preferences) => dispatch(setPreferences(preferences))

    setBusy(true)
    updatePreferences(id, "REMOVE")
    .then(resp => {
      // 500 error comes back as false positive
      if (resp.status === 500) {
        // TODO handle error
        console.log(resp)        
      } else {
        setNeedsReload()
        updateFavorites(favorites.filter(favId => favId !== id))
      }
    })
    .catch(error => {
      // Does not catch 500 error
      // TODO handle error
      console.log(error)
    })
    }, [id, dispatch, favorites]
  )

  const renderListItemComponent = () => {
    if (error) return <FavoritesListItemError onPress={getCityData} />
    if (busy) return <FavoritesListItemLoading />
    return <FavoritesListItem city={cityData} onPress={removeFromFavorites}/>
  }

  useFetchRequest(getCityData)

  return (
    <>
      {renderListItemComponent()}
    </>
  )
}

export default FavoritesListItemContainer