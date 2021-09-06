const FavoritesListItem = ({ city, onPress }) => {
  return (
    <div 
      className="favorites-list-item"
      onClick={onPress}  
    >
      <div>{city.name} ({city.subcountry})</div>
    </div>
  )
}

export default FavoritesListItem