import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Checkbox from "./Checkbox"
import CitiesListItemText from './CitiesListItemText'
import useFavoritesPatchRequest from '../hooks/useFavoritesPatchRequest'
import { setPreferences } from '../redux/actions/preferencesActions'

// TODO: 
//  Somehow stop rerendering of all CitiesListItems when only 1 needs update
//  this is due to the favorites variable changing, or the other functions
//  that depend on it rather.
const CitiesListItem = ({ city, initialState }) => {
  const favorites = useSelector(state => state.preferences)

  const [checked, setChecked] = useState(initialState)
  const previousState = useRef(checked)

  const dispatch = useDispatch()

  const removeFromFavorites = () => {
    dispatch(setPreferences(favorites.filter(id => id !== city.geonameid)))
  }

  const addToFavorites = () => {
    dispatch(setPreferences([...favorites, city.geonameid]))
  }

  const handleClick = () => setChecked("PENDING")

  useFavoritesPatchRequest(
    checked, previousState, city.geonameid, 
    setChecked, removeFromFavorites,
    addToFavorites
  )

  return (
    <div className="list-item" onClick={handleClick}>
      <Checkbox checked={checked} />
      <CitiesListItemText data={city} />
    </div>
  )
}

export default CitiesListItem