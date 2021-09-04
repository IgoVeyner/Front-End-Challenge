import useGetPreferences from "../hooks/useGetPreferences"
import { getPreferences } from "../services/api"

const Preferences = () => {
  const loadPreferences = () => {
    getPreferences()
    .then(data => {
      console.log(data)
      // TODO: save this return data into redux
    })
    .catch(error => console.log(error))
  }

  useGetPreferences(loadPreferences)
  
  return (
    <div>
      <h2>Favorites</h2>
    </div>
  )
}

export default Preferences