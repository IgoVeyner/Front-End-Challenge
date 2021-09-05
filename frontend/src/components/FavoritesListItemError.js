const FavoritesListItemError = ({ onPress }) => {
  return (
    <div className="favorites-list-item">
      <div>Could not get city data...</div>
      <button onClick={onPress}>Try again</button>
    </div>
  )
}

export default FavoritesListItemError