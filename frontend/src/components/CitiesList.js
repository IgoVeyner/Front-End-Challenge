import ListItem from "./ListItem"

const CitiesList = ({ cities }) => {
  const renderList = () => {
    if (!cities.data) return

    return cities.data.map(city => {
      return <ListItem 
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