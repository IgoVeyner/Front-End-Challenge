import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Checkbox from "./Checkbox"
import CitiesListItemText from './CitiesListItemText'
import useFavoritesPatchRequest from '../hooks/useFavoritesPatchRequest'

const CitiesListItem = ({ city, initalState }) => {
  const [checked, setChecked] = useState(initalState)
  const previousState = useRef(checked)
  const favorites = useSelector(state => state.preferences)

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