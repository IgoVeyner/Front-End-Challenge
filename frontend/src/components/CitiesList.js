import { useSelector } from "react-redux"
import CitiesListItem from "./CitiesListItem"

const CitiesList = ({ cities }) => {
  const favorites = useSelector(state => state.preferences)

  const renderList = () => {
    if (!cities.data) return

    return cities.data.map(city => {
      const initialState = favorites.includes(city.geonameid) ? "CHECKED" : "UNCHECKED"

      return <CitiesListItem 
        city={city} 
        key={city.geonameid} 
        initalState={initialState}
      />
    })
  }
  
  return (
    <>
      {renderList()}
    </>
  )
}

export default CitiesList