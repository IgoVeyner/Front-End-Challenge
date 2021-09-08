import { useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetOffset } from "../redux/actions/offsetActions"
import { updateSearchTerm } from '../redux/actions/searchTermActions'
import debounce from 'lodash.debounce';

const useDebouncedSearch = () => {
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

  useEffect(() => {
    return () => { debouncedResults.cancel() }
  }, [debouncedResults])

  return debouncedResults
}

export default useDebouncedSearch