import { useEffect } from 'react'
import { makeCancelable } from '../services/api'

const useCancelableFetch = (callback) => {
  useEffect(() => {
    const cancelablePromise = makeCancelable(
      new Promise(r => callback())
    )
    
    return (()=> {
      cancelablePromise.cancel()
    })
  }, [callback])
}

export default useCancelableFetch