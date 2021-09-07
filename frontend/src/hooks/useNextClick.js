import { useCallback } from "react"
import { onNextClick } from "../services/pagination"

const useNextClick = (list, offset, counter, interval, dispatchCallback) => {
  const nextPage = useCallback(
    () => {
      onNextClick(list.total, offset, counter, interval, dispatchCallback)
    },
    [list, offset, interval, counter, dispatchCallback],
  )
  
  return nextPage
}

export default useNextClick