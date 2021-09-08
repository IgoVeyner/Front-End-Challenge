import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useUpdateInputValue = (searchbar) => {
  const searchTerm = useSelector(state => state.searchTerm)
  
  useEffect(() => {
      searchbar.current.value = searchTerm
  }, [searchTerm, searchbar]);
}

export default useUpdateInputValue