import { useEffect } from 'react'
import { makeCancelable } from '../services/api'

const useCancelableFetch = (getCityData) => {
  useEffect(() => {
    const cancelablePromise = makeCancelable(
      new Promise(r => getCityData())
    )
    
    return (()=> {
      cancelablePromise.cancel()
    })
  }, [getCityData])
}

export default useCancelableFetch