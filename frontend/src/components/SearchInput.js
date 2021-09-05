const SearchInput = ({ onChange }) => {
  return (
    <input 
      className="searchbar"
      type="text" 
      onChange={onChange} 
      placeholder="Type to filter by city name or country"
    />
  )
}

export default SearchInput