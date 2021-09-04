import { useEffect } from 'react'

const useFetchRequest = (callback) => {
  useEffect(() => {
    callback()
  }, [callback])
}

export default useFetchRequest