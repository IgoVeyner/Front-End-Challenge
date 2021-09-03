import { useState } from 'react'
import { getCities } from '../services/api'

const SearchBarContainer = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [offset, setOffset] = useState(0)
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />

      {/* temp button */}
      <button onClick={() => getCities(searchTerm, offset)}>Search</button>
    </div>
  )
}

export default SearchBarContainer