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
      <h1 className="city-name">{city.name}</h1>
      <div className="city-text">
        {city.subcountry} - {city.country}
      </div>
    </div>
  )
}

export default FavoritesListItem