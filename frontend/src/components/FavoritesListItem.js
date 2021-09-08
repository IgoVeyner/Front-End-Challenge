import useLookupFavorite from '../hooks/useLookupFavorite'

const FavoritesListItem = ({ city }) => {
  const handleClick = useLookupFavorite(city.name)

  return (
    <div
      className="favorites-list-item" 
      onClick={handleClick}
    >
      <h1 className="city-name">{city.name}</h1>
      <div className="city-text">
        {city.subcountry} - {city.country}
      </div>
    </div>
  )
}

export default FavoritesListItem