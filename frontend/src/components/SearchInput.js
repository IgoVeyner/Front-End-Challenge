import { useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { resetOffset } from "../redux/actions/offsetActions"
import { updateSearchTerm } from '../redux/actions/searchTermActions'
import useDebounceCleanup from '../hooks/useDebounceCleanup'
import debounce from 'lodash.debounce';
import useUpdateInputValue from '../hooks/useUpdateInputValue'

const SearchInput = () => {
  const searchbar = useRef(null)

  const dispatch = useDispatch()

  const debouncedResults = useMemo(() => {
    const resetOffsetIndex = () => dispatch(resetOffset())
    const setNewSearchTerm = (query) => dispatch(updateSearchTerm(query))
    
    const handleChange = (e) => {
      setNewSearchTerm(e.target.value)
      resetOffsetIndex()
    }
    
    return debounce(handleChange, 400)
  }, [dispatch])

  useDebounceCleanup(debouncedResults)
  useUpdateInputValue(searchbar)

  return (
    <input 
      ref={searchbar}
      className="searchbar"
      type="text" 
      onChange={debouncedResults} 
      placeholder="Type to filter by city name or country"
    />
  )
}

export default SearchInput