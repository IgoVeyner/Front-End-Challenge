import { useCallback } from "react"
import { onPrevClick } from "../services/pagination"

const usePrevClick = (offset, counter, interval, dispatchCallback) => {
  const prevPage = useCallback(() => {
    onPrevClick(offset, counter, interval, dispatchCallback)
  },[counter, offset, interval, dispatchCallback])

  return prevPage
}

export default usePrevClick