import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPreferences } from "../services/api"
import Loading from "./Loading"
import { setLoading } from "../redux/actions/preferencesLoadingActions"
import { setPreferences } from "../redux/actions/preferencesActions"
import useFetchRequest from "../hooks/useFetchRequest"
import FavoritesList from './FavoritesList'

const Preferences = () => {
  const loading = useSelector(state => state.preferencesLoading)

  const dispatch = useDispatch()
  
  const loadPreferences = useCallback(() => {
    const setPreferencesLoading = () => dispatch(setLoading())
    const setFavorites = (data) => dispatch(setPreferences(data))
    
    setPreferencesLoading()
      getPreferences()
      .then(data => {
        console.log(data)
        setFavorites(data)
      })
      .catch(error => {
        console.log(error)
      })
    }, [dispatch])

  useFetchRequest(loadPreferences)
  
  return (
    <div>
      <h2>Favorites</h2>
      {loading ? <Loading /> : (
        // check for error before rendering
        <FavoritesList />
      )}
    </div>
  )
}

export default Preferences