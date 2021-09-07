import { useRef, useEffect} from 'react'

const useOffsetUpdated = (offset, setBusy) => {
  const isMounted = useRef(false)
  
  useEffect(() => {

    if(isMounted.current) {
      setBusy(true)
    } else {
      isMounted.current = true
    }

  }, [offset, setBusy]);
}

export default useOffsetUpdated