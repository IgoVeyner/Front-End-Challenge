import { useState } from 'react'
import FilterIcon from './FilterIcon'
import ClearIcon from './ClearIcon'
import SearchInput from './SearchInput'
import useSearch from '../hooks/useSearch'
import useClearInput from '../hooks/useClearInput'

const SearchBar = () => {
  const [inputId, setInputId] = useState(0)
  const [needsClear, setNeedsClear] = useState(false)

  const handleClick = () => setNeedsClear(true)

  useSearch()
  useClearInput(inputId, setInputId, needsClear, setNeedsClear)
  
  return (
    <div className="search-container">
      <FilterIcon />
      <SearchInput 
        key={inputId}
      />
      <ClearIcon 
        onClick={handleClick}
      />
    </div>
  )
}

export default SearchBar