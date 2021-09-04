import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import useGetPreferences from "../hooks/useGetPreferences"
import { getPreferences } from "../services/api"
import Loading from "./Loading"
import { setLoading } from "../redux/actions/preferencesLoadingActions"
import { setPreferences } from "../redux/actions/preferencesActions"

const Preferences = () => {
  const loading = useSelector(state => state.preferencesLoading)
  const favorites = useSelector(state => state.preferences)

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

  useGetPreferences(loadPreferences)
  
  return (
    <div>
      <h2>Favorites</h2>
      <div>
        {loading ? <Loading /> : "done"}
      </div>
    </div>
  )
}

export default Preferences