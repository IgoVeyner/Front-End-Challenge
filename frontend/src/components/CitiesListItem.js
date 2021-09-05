import { useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from "./Checkbox"
import CitiesListItemText from './CitiesListItemText'
import { updatePreferences } from '../services/api'
import { handleCheckboxError } from '../services/errors'
import useFavoritesPatchRequest from '../hooks/useFavoritesPatchRequest'
import { startPreferenceReload } from '../redux/actions/preferencesReloadActions'
import { setPreferences } from '../redux/actions/preferencesActions'

const CitiesListItem = ({ city, initalState }) => {
  const [checked, setChecked] = useState(initalState)
  const previousState = useRef(checked)

  const favorites = useSelector(state => state.preferences)

  const dispatch = useDispatch()

  const handleClick = () => setChecked("PENDING")

  const onCheck = useCallback(() => {
    const setNeedsReload = () => dispatch(startPreferenceReload())
    const updateFavorites = (preferences) => dispatch(setPreferences(preferences))

    updatePreferences(city.geonameid, "ADD")
    .then(resp => {
      // 500 error comes back as false positive
      if (resp.status === 500) {
        handleCheckboxError(resp, "Add")
        setChecked("UNCHECKED")
      } else {
        previousState.current = "CHECKED"
        setChecked("CHECKED")
        setNeedsReload()
        updateFavorites(favorites.filter(id => id !== city.geonameid))
      }
    })
    .catch(error => {
      // Does not catch 500 error
      handleCheckboxError(error, "ADD")
    })
    }, [city.geonameid, dispatch, favorites]
  )
  
  // TODO fetch new preferences on completion
  const onUncheck = useCallback(() => {
    const setNeedsReload = () => dispatch(startPreferenceReload())
    const updateFavorites = (preferences) => dispatch(setPreferences(preferences))

    updatePreferences(city.geonameid, "REMOVE")
    .then(resp => {
      // 500 error comes back as false positive
      if (resp.status === 500) {
        handleCheckboxError(resp, "Remove")
        setChecked("CHECKED")
      } else {
        previousState.current = "UNCHECKED"
        setChecked("UNCHECKED")
        setNeedsReload()
        updateFavorites(favorites.filter(id => id !== city.geonameid))
      }
    })
    .catch(error => {
      // Does not catch 500 error
      handleCheckboxError(error, "Remove")
    })
    }, [city.geonameid, dispatch, favorites]
  )

  useFavoritesPatchRequest(checked, onCheck, onUncheck, previousState)

  return (
    <div className="list-item" onClick={handleClick}>
      <Checkbox checked={checked} />
      <CitiesListItemText data={city} />
    </div>
  )
}

export default CitiesListItem