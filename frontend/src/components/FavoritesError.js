const FavoritesError = ({ onPress }) => {
  return (
    <div className="favorites-error">
      <div>
        Failed to load favorites <br/>
        <button onClick={onPress}>Try Again</button>
      </div>
    </div>
  )
}

export default FavoritesError