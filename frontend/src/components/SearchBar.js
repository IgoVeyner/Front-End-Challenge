import FilterIcon from './FilterIcon'
import ClearIcon from './ClearIcon'
import SearchInput from './SearchInput'
import useSearch from '../hooks/useSearch'
import useClearInput from '../hooks/useClearInput'

const SearchBar = () => {
  useSearch()
  const {handleClick, key} = useClearInput()
  
  return (
    <div className="search-container">
      <FilterIcon />
      <SearchInput key={key} />
      <ClearIcon onClick={handleClick} />
    </div>
  )
}

export default SearchBar