const FavoritesError = ({ onPress }) => {
  return (
    <div>
      <div>
        Something went wrong...
      </div>

      <button onClick={onPress}>Try Again</button>
    </div>
  )
}

export default FavoritesError