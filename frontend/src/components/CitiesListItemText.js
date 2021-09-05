const CitiesListItemText = ({ data }) => {
  return (
    <div className="city-text-container">
      <h1 className="city-name">{data.name}</h1>

      <div className="city-text">
        {data.subcountry} - {data.country}
      </div>
    </div>
  )
}

export default CitiesListItemText