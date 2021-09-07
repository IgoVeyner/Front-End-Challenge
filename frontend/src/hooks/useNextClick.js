import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { updatePreferncesOffset } from '../redux/actions/preferencesOffsetActions'
import { onNextClick } from "../services/pagination"

const useNextClick = (list, offset, counter, interval) => {
  const dispatch = useDispatch()

  const nextPage = useCallback(
    () => {
      const updateOffset = (data) => dispatch(updatePreferncesOffset(data))
      onNextClick(list.total, offset, counter, interval, updateOffset)
    },
    [list, offset, dispatch, interval, counter],
  )
  
  return nextPage
}

export default useNextClick