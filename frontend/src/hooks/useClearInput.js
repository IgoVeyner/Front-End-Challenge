import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSearchTerm } from '../redux/actions/searchTermActions'

const useClearInput = () => {
  const [id, setId] = useState(0)
  const [needsClear, setNeedsClear] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const resetSearchTerm = () => dispatch(updateSearchTerm(''))
    const resetSearchInput = () => setId(id + 1)

    const handleSearchInput = () => {
      resetSearchTerm()
      resetSearchInput()
    }

    if (needsClear) {
      handleSearchInput()
      setNeedsClear(false)
    } 
  }, [dispatch, needsClear, id, setNeedsClear, setId]);

  return {
    handleClick: () => setNeedsClear(true),
    key: id
  }
}

export default useClearInput