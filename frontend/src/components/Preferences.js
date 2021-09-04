import { useDispatch, useSelector } from "react-redux"
import useGetPreferences from "../hooks/useGetPreferences"
import { getPreferences } from "../services/api"
import Loading from "./Loading"
import { setLoading } from "../redux/actions/preferencesLoadingActions"

const Preferences = () => {
  const loading = useSelector(state => state.preferencesLoading)

  const dispatch = useDispatch()
  const setPreferencesLoading = () => dispatch(setLoading())
  
  const loadPreferences = () => {
    setPreferencesLoading()
    getPreferences()
    .then(data => {
      console.log(data)
      // TODO: save this return data into redux
    })
    .catch(error => {
      console.log(error)
    })
  }

  useGetPreferences(loadPreferences)
  
  return (
    <div>
      <h2>Favorites</h2>
      <div>
        {/* {loading ? <Loading /> : "done"} */}
      </div>
    </div>
  )
}

export default Preferences