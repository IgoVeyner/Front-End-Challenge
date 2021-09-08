import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'
import { startPreferenceReload } from '../redux/actions/preferencesReloadActions'
import { updatePreferences } from '../services/api'
import { handleCheckboxError } from '../services/errors'
import { setPreferences } from '../redux/actions/preferencesActions'

const useFavoritesPatchRequest = (
    checked, previousState, cityId, 
    setChecked, favorites
  ) => {
  const dispatch = useDispatch()
  const isMounted = useRef(false)
  
  useEffect(() => {
    const setNeedsReload = () => dispatch(startPreferenceReload())

    const removeFromFavorites = () => {
      dispatch(setPreferences(favorites.filter(id => id !== cityId)))
    }
  
    const addToFavorites = () => {
      dispatch(setPreferences([...favorites, cityId]))
    }
  
    let ignore = false
    const requestType = previousState.current === "UNCHECKED" ? "ADD" : "REMOVE"

    async function updateData() {
      const response = await updatePreferences(cityId, requestType)
      if (!ignore) {
        if (response.status === 500) {
          
          if (requestType === "ADD") {
            setChecked("UNCHECKED")
            handleCheckboxError(response, "Add")
          } else {
            setChecked("CHECKED")
            handleCheckboxError(response, "Remove")
          }
          
        } else {
          
          if (requestType === "ADD") {
            previousState.current = "CHECKED"
            setChecked("CHECKED")
            addToFavorites()
          } else {
            previousState.current = "UNCHECKED"
            setChecked("UNCHECKED")
            removeFromFavorites()
          }
          
          setNeedsReload()
        }
      }
    }

    if (isMounted.current) {
      if (checked === "PENDING") updateData()
    } else {
      isMounted.current = true
    }
    
    return () => { ignore = true }
  }, [cityId, checked, previousState, setChecked, dispatch, favorites])
}

export default useFavoritesPatchRequest