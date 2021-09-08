import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Checkbox from "./Checkbox"
import CitiesListItemText from './CitiesListItemText'
import useFavoritesPatchRequest from '../hooks/useFavoritesPatchRequest'

// TODO: 
//  combine and debounce the PATCH requests to limit API requests
//  & to make reload of favorites container faster
const CitiesListItem = ({ city }) => {
  const favorites = useSelector(state => state.preferences)

  const initialState = favorites.includes(city.geonameid) ? "CHECKED" : "UNCHECKED"

  const [checked, setChecked] = useState(initialState)
  const previousState = useRef(checked)

  const handleClick = () => setChecked("PENDING")

  useFavoritesPatchRequest(
    checked, previousState, city.geonameid, 
    setChecked, favorites
  )

  return (
    <div className="list-item" onClick={handleClick}>
      <Checkbox checked={checked} />
      <CitiesListItemText data={city} />
    </div>
  )
}

export default CitiesListItem