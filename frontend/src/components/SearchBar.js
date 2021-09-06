import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchTerm } from '../redux/actions/searchTermActions'
import FilterIcon from './FilterIcon'
import ClearIcon from './ClearIcon'
import SearchInput from './SearchInput'
import useSearch from '../hooks/useSearch'

const SearchBar = () => {
  const [inputId, setInputId] = useState(0)

  // TODO: move search term into clear icon
  const searchTerm = useSelector(state => state.searchTerm)

  const dispatch = useDispatch()
  const resetSearchTerm = () => dispatch(updateSearchTerm(''))
  const resetSearchInput = () => setInputId(inputId + 1)

  const handleClick = () => {
    resetSearchTerm()
    resetSearchInput()
  }
  
  useSearch()
  
  return (
    <div className="search-container">
      <FilterIcon />
      <SearchInput 
        key={inputId}
      />
      <ClearIcon 
        hidden={searchTerm === ""}
        onClick={handleClick}
      />
    </div>
  )
}

export default SearchBar