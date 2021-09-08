import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSearchTerm } from '../redux/actions/searchTermActions'

const useClearInput = () => {
  const [id, setId] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const resetSearchTerm = () => dispatch(updateSearchTerm(''))
    resetSearchTerm()
  }, [dispatch, id]);

  return {
    handleClick: () => setId(id + 1),
    key: id
  }
}

export default useClearInput