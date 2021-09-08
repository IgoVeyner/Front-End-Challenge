import Checkbox from "./Checkbox"
import CitiesListItemText from './CitiesListItemText'
import useFavoritesPatchRequest from '../hooks/useFavoritesPatchRequest'
import useChecked from '../hooks/useChecked'

// TODO: 
//  combine and debounce the PATCH requests to limit API requests
//  & to make reload of favorites container faster
const CitiesListItem = ({ city }) => {
  const { checked, setChecked, previousState, handleClick } = useChecked(city.geonameid)
  useFavoritesPatchRequest(city.geonameid, previousState, checked, setChecked)

  return (
    <div className="list-item" onClick={handleClick}>
      <Checkbox checked={checked} />
      <CitiesListItemText data={city} />
    </div>
  )
}

export default CitiesListItem