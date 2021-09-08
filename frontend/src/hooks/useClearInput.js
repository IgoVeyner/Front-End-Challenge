import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateSearchTerm } from '../redux/actions/searchTermActions'

const useClearInput = (inputId, setInputId, needsClear, setNeedsClear) => {
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
}

export default useClearInput