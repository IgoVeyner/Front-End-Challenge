import { useEffect } from 'react'

const useGetCityData = (callback, hasError) => {
  useEffect(() => {
    if (!hasError) callback()  
  }, [callback, hasError])
}

export default useGetCityData