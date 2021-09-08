import { useRef } from 'react'
import useUpdateInputValue from '../hooks/useUpdateInputValue'
import useDebouncedSearch from '../hooks/useDebounceSearch'

const SearchInput = () => {
  const searchbar = useRef(null)
  const handleChange = useDebouncedSearch()

  useUpdateInputValue(searchbar)

  return (
    <input 
      ref={searchbar}
      className="searchbar"
      type="text" 
      onChange={handleChange} 
      placeholder="Type to filter by city name or country"
    />
  )
}

export default SearchInput