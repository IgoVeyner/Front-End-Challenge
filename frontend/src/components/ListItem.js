const ListItem = ({ city }) => {
  return (
    <div className="list-item">
      <div className="checkbox-container">
        <input 
          type="checkbox" 
          className="input-checkbox"
          />
      </div>

      <div className="city-text-container">
        <h1 className="city-name">{city.name}</h1>

        <div className="city-text">
          {city.subcountry} - {city.country}
        </div>
      </div>
    </div>
  )
}

export default ListItem