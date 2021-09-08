import { useSelector } from "react-redux"
import checkForMatch from "../services/boldenMatch"

const CitiesListItemText = ({ data }) => {
  const {name, subcountry, country} = data
  const searchTerm = useSelector(state => state.searchTerm)
  
  return (
    <div className="city-text-container">
      <h1 className="city-name">{checkForMatch(name, searchTerm)}</h1>

      <div className="city-text">
        {checkForMatch(subcountry, searchTerm)} - {checkForMatch(country, searchTerm)}
      </div>
    </div>
  )
}

export default CitiesListItemText