const SearchError = ({ onPress }) => {  
  return (
    <div className="search-error">
      <div>
        Failed to load search <br/>
        <button onClick={onPress}>Try Again</button>
      </div>

    </div>
  )
}

export default SearchError