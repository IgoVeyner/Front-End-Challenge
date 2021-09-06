const AppError = ({ onPress }) => {
  return (
    <div className="app-error">
      <h1>Oops!</h1>
      <h2>Failed to load User Preferences...</h2>
      <button onClick={onPress}>Try Again</button>
    </div>
  )
}

export default AppError