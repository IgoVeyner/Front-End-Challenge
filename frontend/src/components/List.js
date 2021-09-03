import { useSelector } from "react-redux"

const List = () => {
  const cities = useSelector(state => state.cities)

  const renderList = () => {
    return cities.data.map(city => {
      return (
        <div key={city.geonameid}>
          <input type="checkbox" />
          <h1>{city.name}</h1>
          <p>{city.subcountry}</p>
          <p>{city.country}</p>
        </div>
      )
    })
  }

  return (
    <div>
      {cities.data ? renderList() : null}
    </div>
  )
}

export default List