import { useState, useCallback } from 'react'
import { getCities } from '../services/api'
import { useDispatch } from 'react-redux'
import { setCities } from '../redux/actions/citiesActions'
import useSearch from '../hooks/useSearch'

const SearchBarContainer = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [offset, setOffset] = useState(0)

  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = useCallback(() => {
    const updateCities = (parsed) => dispatch(setCities(parsed, offset))

    getCities(searchTerm, offset)
    .then(parsed => {
      updateCities(parsed)
    })
  }, [searchTerm, offset, dispatch])

  useSearch(handleSubmit)

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
    </div>
  )
}

export default SearchBarContainer