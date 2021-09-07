import { useEffect } from "react"
import { getCity } from "../services/api"
import { handleFavoritesItemError } from "../services/errors"

const useGetCityData = (id, setBusy, setError, setCityData) => {
  useEffect(() => {
    let ignore = false 

    async function getData() {
      const response = await getCity(id)
      if (!ignore) {
        if (response.statusCode === 500) {
          setError(true)
          handleFavoritesItemError(response, id)
        } else {
          setError(false)
          setCityData(response)
        }
        setBusy(false)
      }
    }

    getData()
    return () => {ignore = true}
  }, [id, setBusy, setError, setCityData])
}

export default useGetCityData