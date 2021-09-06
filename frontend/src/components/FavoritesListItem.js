import { useDispatch } from 'react-redux'
import { resetOffset } from '../redux/actions/offsetActions'
import { updateSearchTerm } from '../redux/actions/searchTermActions'

const FavoritesListItem = ({ city }) => {
  const dispatch = useDispatch()

  const lookupCity = () => dispatch(updateSearchTerm(city.name))
  const resetSearchOffset = () => dispatch(resetOffset())
  
  const handleClick = () => {
    lookupCity()
    resetSearchOffset()
  }

  return (
    <div
      className="favorites-list-item" 
      onClick={handleClick}
    >
      <div>{city.name} ({city.subcountry})</div>
    </div>
  )
}

export default FavoritesListItem