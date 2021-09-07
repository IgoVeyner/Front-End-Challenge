import { useSelector } from "react-redux"
import CitiesListItem from "./CitiesListItem"
import NoResults from "./NoResults"

const CitiesList = ({ cities }) => {
  const favorites = useSelector(state => state.preferences)

  const renderList = () => {
    if (!cities.data || (cities.data && cities.data.length === 0)) {
      return <NoResults text="No Results Found :("/>
    } 

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