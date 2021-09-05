import { useCallback, useMemo, useState } from 'react'
import { getCities } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setCities } from '../redux/actions/citiesActions'
import { resetOffset } from "../redux/actions/offsetActions"
import debounce from 'lodash.debounce';
import useDebounceCleanup from '../hooks/useDebounceCleanup'
import { setLoading } from '../redux/actions/searchLoadingActions'
import { setSearchError } from '../redux/actions/searchErrorActions'
import { handleError } from '../services/errors'
import useFetchRequest from '../hooks/useFetchRequest'
import { updateSearchTerm } from '../redux/actions/searchTermActions'
import FilterIcon from './FilterIcon'
import ClearIcon from './ClearIcon'
import SearchInput from './SearchInput'

const SearchBar = ({ onSubmit }) => {
  const [inputId, setInputId] = useState(0)

  const searchTerm = useSelector(state => state.searchTerm)
  const offset = useSelector(state => state.offset)

  const dispatch = useDispatch()
  const resetSearchTerm = () => dispatch(updateSearchTerm(''))

  const resetSearchInput = () => {
    setInputId(inputId + 1)
  }

  const handleClick = () => {
    resetSearchTerm()
    resetSearchInput()
  }

  // TODO: abstract & refactor with Redux-Thunk
  const handleSubmit = useCallback(() => {
    const updateCities = (parsed) => dispatch(setCities(parsed, offset))
    const setBusy = () => dispatch(setLoading())
    const setSearchErrorToTrue = () => dispatch(setSearchError())

    setBusy()
    getCities(searchTerm, offset)
    .then(parsed => {

      // 500 error code comes back as false positive so we need to error handle here
      parsed.statusCode === 500 ? 
        handleError(parsed, setSearchErrorToTrue) 
        : 
        updateCities(parsed)
    })
    .catch(error => {

      // does not catch 500 error code
      handleError(error, setSearchErrorToTrue)
    })
  }, [searchTerm, offset, dispatch])

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
  useFetchRequest(handleSubmit)
  
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