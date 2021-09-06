import { useDispatch } from 'react-redux'
import { updateSearchTerm } from '../redux/actions/searchTermActions'

const FavoritesListItem = ({ city }) => {
  const dispatch = useDispatch()

  const lookupCity = () => dispatch(updateSearchTerm(city.name))
  
  return (
    <div
      className="favorites-list-item" 
      onClick={lookupCity}
    >
      <div>{city.name} ({city.subcountry})</div>
    </div>
  )
}

export default FavoritesListItem