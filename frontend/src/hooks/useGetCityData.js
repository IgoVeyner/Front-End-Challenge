import { useCallback } from "react"
import { getCity } from "../services/api"
import { handleFavoritesItemError } from "../services/errors"

const useGetCityData = (id, setBusy, setError, setCityData) => {
  const getCityData = useCallback(
    () => {
      setBusy(true)
      getCity(id)
      .then(resp => {
        // 500 error code come back as false positive 
        if (resp.statusCode === 500) {
          setError(true)
          handleFavoritesItemError(resp, id)
        } else {
          setError(false)
          setCityData(resp)
        }
        setBusy(false)
      })
      .catch(error => {
        // 500 error code wont be caught here
        handleFavoritesItemError(error, id)
        setBusy(false)
        setError(true)
      })
    }, [id, setBusy, setError, setCityData]
  )

  return getCityData
}

export default useGetCityData