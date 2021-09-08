import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'
import { startPreferenceReload } from '../redux/actions/preferencesReloadActions'
import { setPreferences } from '../redux/actions/preferencesActions'
import { updatePreferences } from '../services/api'
import { handleCheckboxError } from '../services/errors'

const useFavoritesPatchRequest = (
    checked, previousState, cityId, 
    setChecked, favorites
  ) => {
  const dispatch = useDispatch()
  const isMounted = useRef(false)
  
  useEffect(() => {
    const setNeedsReload = () => dispatch(startPreferenceReload())
    const updateFavorites = (preferences) => dispatch(setPreferences(preferences))
    
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
          } else {
            previousState.current = "UNCHECKED"
            setChecked("UNCHECKED")
          }
          
          setNeedsReload()
        }
      }

      if (response.status !== 500) {
        requestType === "ADD" ? 
          updateFavorites([...favorites, cityId])
          :
          updateFavorites(favorites.filter(id => id !== cityId))
      }
    }

    if (isMounted.current) {
      if (checked === "PENDING") updateData()
    } else {
      isMounted.current = true
    }
    
    return () => {ignore = true}
  }, [cityId, favorites, checked, dispatch, previousState, setChecked])
}

export default useFavoritesPatchRequest