import { useState, useCallback, useRef } from 'react'
import Checkbox from "./Checkbox"
import CitiesListItemText from './CitiesListItemText'
import { updatePreferences } from '../services/api'
import { handleCheckboxError } from '../services/errors'
import useFavoritesPatchRequest from '../hooks/useFavoritesPatchRequest'

const CitiesListItem = ({ city }) => {
  const [checked, setChecked] = useState("UNCHECKED")
  const previousState = useRef(checked)

  const handleClick = () => setChecked("PENDING")

  // TODO fetch new preferences on completion
  const onCheck = useCallback(() => {
    updatePreferences(city.geonameid, "ADD")
    .then(resp => {
      // 500 error comes back as false positive
      if (resp.status === 500) {
        handleCheckboxError(resp, "Add")
        setChecked("UNCHECKED")
      } else {
        previousState.current = "CHECKED"
        setChecked("CHECKED")
      }
    })
    .catch(error => {
      // Does not catch 500 error
      handleCheckboxError(error, "ADD")
    })
    }, [city.geonameid]
  )
  
  // TODO fetch new preferences on completion
  const onUncheck = useCallback(() => {
    updatePreferences(city.geonameid, "REMOVE")
    .then(resp => {
      // 500 error comes back as false positive
      if (resp.status === 500) {
        handleCheckboxError(resp, "Remove")
        setChecked("CHECKED")
      } else {
        previousState.current = "UNCHECKED"
        setChecked("UNCHECKED")
      }
    })
    .catch(error => {
      // Does not catch 500 error
      handleCheckboxError(error, "Remove")
    })
    }, [city.geonameid]
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