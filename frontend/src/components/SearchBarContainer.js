import { useState, useCallback, useMemo } from 'react'
import { getCities } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setCities } from '../redux/actions/citiesActions'
import { resetOffset } from "../redux/actions/offsetActions"
import useSearch from '../hooks/useSearch'
import debounce from 'lodash.debounce';
import useDebounceCleanup from '../hooks/useDebounceCleanup'

const SearchBarContainer = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const offset = useSelector(state => state.offset)

  const dispatch = useDispatch()

  const handleSubmit = useCallback(() => {
    const updateCities = (parsed) => dispatch(setCities(parsed, offset))

    getCities(searchTerm, offset)
    .then(parsed => {
      updateCities(parsed)
    })
  }, [searchTerm, offset, dispatch])

  // debounce search to limit API requests,
  // sometimes API returns 500 error randomly? 
  // Perhaps too many requests? - Still occurs but less often now.
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
    <div>
      <input type="text" onChange={debouncedResults} />
    </div>
  )
}

export default SearchBarContainer