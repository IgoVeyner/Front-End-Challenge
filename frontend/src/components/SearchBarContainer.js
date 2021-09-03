import { useState } from 'react'
import { getCities } from '../services/api'
import { useDispatch } from 'react-redux'
import { setCities } from '../redux/actions/citiesActions'

const SearchBarContainer = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [offset, setOffset] = useState(0)
  const dispatch = useDispatch()

  const updateCities = (parsed) => dispatch(setCities(parsed, offset))
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = () => {
    console.log("searching")
    getCities(searchTerm, offset)
    .then(parsed => {
      updateCities(parsed)
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