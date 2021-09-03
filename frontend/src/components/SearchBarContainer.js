import { useState } from 'react'
import { getCities } from '../services/api'

const SearchBarContainer = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [offset, setOffset] = useState(0)
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = () => {
    getCities(searchTerm, offset)
    .then(parsed => {
      onSubmit(parsed)
    })
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />

      {/* temp button */}
      <button onClick={handleSubmit}>Search</button>
    </div>
  )
}

export default SearchBarContainer