const AppError = ({ onPress }) => {
  return (
    <div className="app-error">
      <h1>Failed to load User Preferences</h1>
      <button onClick={onPress}>Try Again</button>
    </div>
  )
}

export default AppError