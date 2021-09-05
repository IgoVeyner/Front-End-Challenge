import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '../redux/actions/searchLoadingActions'
import { setCities } from '../redux/actions/citiesActions'
import { getCities } from '../services/api'
import { handleError } from '../services/errors'
import { setSearchError } from '../redux/actions/searchErrorActions'

const SearchError = () => {
  const dispatch = useDispatch()
  
  const searchTerm = useSelector(state => state.searchTerm)
  const offset = useSelector(state => state.offset)

  // TODO: abstract & refactor with Redux-Thunk
  const handleClick = () => {
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
  }
  
  return (
    <div>
      <div>
        Something went wrong..
      </div>

      <button onClick={handleClick}>Try Again</button>
    </div>
  )
}

export default SearchError