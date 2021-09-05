import CitiesListItem from "./CitiesListItem"

const CitiesList = ({ cities }) => {
  const renderList = () => {
    if (!cities.data) return

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