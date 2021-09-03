import { useState } from 'react'

const SearchBarContainer = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />

      {/* temp button */}
      <button>Search</button>
    </div>
  )
}

export default SearchBarContainer