import { useState, useCallback, useMemo } from 'react'
import { getCities } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setCities } from '../redux/actions/citiesActions'
import { resetOffset } from "../redux/actions/offsetActions"
import useSearch from '../hooks/useSearch'
import debounce from 'lodash.debounce';
import useDebounceCleanup from '../hooks/useDebounceCleanup'
import { setLoading } from '../redux/actions/loadingActions'

const SearchBarContainer = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const offset = useSelector(state => state.offset)

  const dispatch = useDispatch()

  const handleSubmit = useCallback(() => {
    const updateCities = (parsed) => dispatch(setCities(parsed, offset))
    const setBusy = () => dispatch(setLoading())

    setBusy()
    getCities(searchTerm, offset)
    .then(parsed => {
      updateCities(parsed)
    })
    .catch(error => {
      // TODO add searchError state to redux and enable it here on error
    })
  }, [searchTerm, offset, dispatch])

  const debouncedResults = useMemo(() => {
    const resetOffsetIndex = () => dispatch(resetOffset())

    const handleChange = (e) => {
      setSearchTerm(e.target.value)
      resetOffsetIndex()
    }

    return debounce(handleChange, 400)
  }, [dispatch])
  
  useDebounceCleanup(debouncedResults)
  useSearch(handleSubmit)
  
  return (
    <div className="search-container">
      <input 
        className="searchbar"
        type="text" 
        onChange={debouncedResults} 
        placeholder="Type to filter by city name or country"
      />
    </div>
  )
}

export default SearchBarContainer