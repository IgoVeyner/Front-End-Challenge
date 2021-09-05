import { useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { handleError } from '../services/errors'
import { getCities } from '../services/api'
import { setCities } from '../redux/actions/citiesActions'
import { setSearchError } from '../redux/actions/searchErrorActions'
import { setLoading } from "../redux/actions/searchLoadingActions"

const useSearch = () => {
  const offset = useSelector(state => state.offset)
  const searchTerm = useSelector(state => state.searchTerm)
  
  const dispatch = useDispatch()
  
  // TODO: abstract & refactor with Redux-Thunk
  const handleSubmit = useCallback(() => {
    const setBusy = () => dispatch(setLoading())
    const updateCities = (parsed) => dispatch(setCities(parsed, offset))
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

  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])
}

export default useSearch