import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { endPreferenceReload } from '../redux/actions/preferencesReloadActions'

const useNeedsReload = (needsReload, setBusy) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const finishPreferencesReload = () => dispatch(endPreferenceReload())
    
    if(needsReload) {
      setBusy(true)
      finishPreferencesReload()
    }
  }, [needsReload, setBusy, dispatch]);
}

export default useNeedsReload