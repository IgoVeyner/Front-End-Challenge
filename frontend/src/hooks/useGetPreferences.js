import { useEffect } from "react"
import { getPreferences } from "../services/api"
import { handleFavoritesError } from '../services/errors'

const useGetPreferences = (offset, setError, setFavorites, needsReload, setBusy, busy) => {
  useEffect(() => {
    let ignore = false 
    
    async function getData() {
      const response = await getPreferences(offset)
      if (!ignore) {
        if (response.statusCode === 500) {
          handleFavoritesError(response)
          setError(true)
        } else {
          setError(false)
          setFavorites(response)
        }
        setBusy(false)
      }
    }

    if (busy) getData()

    return () => {ignore = true}
  }, [offset, setError, setFavorites, needsReload, setBusy, busy]);
}

export default useGetPreferences