const FavoritesListItem = ({ city }) => {
  return (
    <div className="favorites-list-item">
      <div>{city.name} ({city.subcountry})</div>
    </div>
  )
}

export default FavoritesListItem