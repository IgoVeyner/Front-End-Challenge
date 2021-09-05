import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetOffset } from "../redux/actions/offsetActions"
import debounce from 'lodash.debounce';
import useDebounceCleanup from '../hooks/useDebounceCleanup'
import { updateSearchTerm } from '../redux/actions/searchTermActions'
import FilterIcon from './FilterIcon'
import ClearIcon from './ClearIcon'
import SearchInput from './SearchInput'
import useSearch from '../hooks/useSearch'

const SearchBar = ({ onSubmit }) => {
  const [inputId, setInputId] = useState(0)

  // TODO: move search term into clear icon
  const searchTerm = useSelector(state => state.searchTerm)
  const offset = useSelector(state => state.offset)

  const dispatch = useDispatch()
  const resetSearchTerm = () => dispatch(updateSearchTerm(''))
  const resetSearchInput = () => setInputId(inputId + 1)

  const handleClick = () => {
    resetSearchTerm()
    resetSearchInput()
  }
  
  const debouncedResults = useMemo(() => {
    const resetOffsetIndex = () => dispatch(resetOffset())
    const setNewSearchTerm = (query) => dispatch(updateSearchTerm(query))
    
    const handleChange = (e) => {
      setNewSearchTerm(e.target.value)
      resetOffsetIndex()
    }
    
    return debounce(handleChange, 400)
  }, [dispatch])
  
  useSearch()
  useDebounceCleanup(debouncedResults)
  
  return (
    <div className="search-container">
      <FilterIcon />
      <SearchInput 
        onChange={debouncedResults} 
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