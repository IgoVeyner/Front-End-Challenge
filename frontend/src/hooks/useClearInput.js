import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSearchTerm } from '../redux/actions/searchTermActions'

const useClearInput = () => {
  const [inputId, setInputId] = useState(0)
  const [needsClear, setNeedsClear] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {

    const resetSearchTerm = () => dispatch(updateSearchTerm(''))
    const resetSearchInput = () => setInputId(inputId + 1)

    const handleSearchInput = () => {
      resetSearchTerm()
      resetSearchInput()
    }

    if (needsClear) {
      handleSearchInput()
      setNeedsClear(false)
    } 

  }, [dispatch, needsClear, inputId, setNeedsClear, setInputId]);

  return {
    handleClick: () => setNeedsClear(true),
    key: inputId
  }
}

export default useClearInput