import { useDispatch } from 'react-redux'
import { resetOffset } from '../redux/actions/offsetActions'
import { updateSearchTerm } from '../redux/actions/searchTermActions'

const useLookupFavorite = (query) => {
  const dispatch = useDispatch()

  const lookupCity = () => dispatch(updateSearchTerm(query))
  const resetSearchOffset = () => dispatch(resetOffset())
  
  const handleClick = () => {
    lookupCity()
    resetSearchOffset()
  }

  return handleClick
}

export default useLookupFavorite