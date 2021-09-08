import { useRef } from "react"
import { useDispatch } from "react-redux"
import { updateOffset } from "../redux/actions/offsetActions"
import { prevDisableCheck, nextDisableCheck } from '../services/pagination'
import useNextClick from "../hooks/useNextClick"
import usePrevClick from "../hooks/usePrevClick"

const usePagination = (list, offset, busy, error) => {
  const interval = useRef(null)
  const nextPageClicks = useRef(0)
  const prevPageClicks = useRef(0)

  const dispatch = useDispatch()
  const updateCitiesOffset = (data) => dispatch(updateOffset(data))
  
  const disabledStatus = [
    prevDisableCheck(busy, error, list, offset), 
    nextDisableCheck(busy, error, list, offset)
  ]

  const nextPage = useNextClick(list, offset, nextPageClicks, interval, updateCitiesOffset)
  const prevPage = usePrevClick(offset, prevPageClicks, interval, updateCitiesOffset)

  return {
    disabledStatus,
    nextPage,
    prevPage, 
  }
}

export default usePagination