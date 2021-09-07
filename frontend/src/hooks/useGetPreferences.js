import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPreferences } from "../services/api"
import { handleFavoitesContainerError } from '../services/errors'
import { endPreferenceReload } from '../redux/actions/preferencesReloadActions'

const useGetPreferences = (setBusy, setError, setFavorites, needsReload) => {
  const offset = useSelector(state => state.preferencesOffset)

  const dispatch = useDispatch()

  const loadPreferences = useCallback(() => {
    const finishPreferencesReload = () => dispatch(endPreferenceReload())

    setBusy(true)
    getPreferences(offset)
    .then(resp => {
      // 500 error code comes back as false positive so we need to error handle here
      if (resp.statusCode === 500) {
        handleFavoitesContainerError(resp)
        setError(true)
      } else {
        setError(false)
        setFavorites(resp)
        if (needsReload) {
          finishPreferencesReload()
        }
      }
      setBusy(false)
    })
    .catch(error => {
      // does not catch 500 error code
      handleFavoitesContainerError(error)
    })
    }, [setBusy, setError, setFavorites, offset, needsReload, dispatch]
  )

  return loadPreferences
}

export default useGetPreferences