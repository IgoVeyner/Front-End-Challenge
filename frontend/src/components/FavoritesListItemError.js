const FavoritesListItemError = ({ onPress }) => {
  return (
    <div className="favorites-item-error" onClick={onPress}>
      <div>Failed to get city data...</div>
      <div>Click to Try Again</div>
    </div>
  )
}

export default FavoritesListItemError