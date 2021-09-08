import { useState } from 'react'
import { useSelector } from 'react-redux'
import FilterIcon from './FilterIcon'
import ClearIcon from './ClearIcon'
import SearchInput from './SearchInput'
import useSearch from '../hooks/useSearch'
import useClearInput from '../hooks/useClearInput'

const SearchBar = () => {
  const [inputId, setInputId] = useState(0)
  const [needsClear, setNeedsClear] = useState(false)

  const searchTerm = useSelector(state => state.searchTerm)

  const handleClick = () => setNeedsClear(true)

  useSearch(searchTerm)
  useClearInput(inputId, setInputId, needsClear, setNeedsClear)
  
  return (
    <div className="search-container">
      <FilterIcon />
      <SearchInput 
        key={inputId}
      />
      <ClearIcon 
        hidden={searchTerm === ""}
        onClick={handleClick}
      />
    </div>
  )
}

export default SearchBar