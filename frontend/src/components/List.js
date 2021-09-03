const List = ({ cities }) => {

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
      {renderList()}
    </div>
  )
}

export default List