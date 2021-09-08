import { useRef } from "react"
import { prevDisableCheck, nextDisableCheck } from '../services/pagination'
import useNextClick from "../hooks/useNextClick"
import usePrevClick from "../hooks/usePrevClick"

const usePagination = (list, offset, busy, error, dispatchCallback) => {
  const interval = useRef(null)
  const nextPageClicks = useRef(0)
  const prevPageClicks = useRef(0)
  
  const disabledStatus = [
    prevDisableCheck(busy, error, list, offset), 
    nextDisableCheck(busy, error, list, offset)
  ]

  const nextPage = useNextClick(list, offset, nextPageClicks, interval, dispatchCallback)
  const prevPage = usePrevClick(offset, prevPageClicks, interval, dispatchCallback)

  return {
    disabledStatus,
    nextPage,
    prevPage, 
  }
}

export default usePagination