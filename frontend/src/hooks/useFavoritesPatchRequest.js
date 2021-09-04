import { useEffect, useRef } from "react";

const useFavoritesPatchRequest = (checked, onCheck, onUncheck, previousState) => {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      if (checked === "PENDING") {
        previousState.current === "UNCHECKED" ? onCheck() : onUncheck()
      }
    } else {
      mounted.current = true
    }
  }, [checked, onCheck, onUncheck, previousState])
}

export default useFavoritesPatchRequest