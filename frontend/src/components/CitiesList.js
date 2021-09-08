import CitiesListItem from "./CitiesListItem"
import NoResults from "./NoResults"

const CitiesList = ({ cities }) => {
  const renderList = () => {
    if (!cities.data || (cities.data && cities.data.length === 0)) {
      return <NoResults text="No Results Found :("/>
    } 

    return cities.data.map(city => {
      return <CitiesListItem 
          city={city} 
          key={city.geonameid} 
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