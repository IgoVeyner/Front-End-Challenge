import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { updatePreferncesOffset } from '../redux/actions/preferencesOffsetActions'
import { onPrevClick } from "../services/pagination"

const usePrevClick = (offset, counter, interval) => {
  const dispatch = useDispatch()

  const prevPage = useCallback(() => {
    const updateOffset = (data) => dispatch(updatePreferncesOffset(data))
    onPrevClick(offset, counter, interval, updateOffset)
  },[counter, offset, interval, dispatch])

  return prevPage
}

export default usePrevClick