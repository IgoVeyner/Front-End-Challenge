import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { resetOffset, updateOffset } from "../redux/actions/offsetActions"
// import { setPreferences } from '../redux/actions/preferencesActions'
import { updatePreferences } from '../services/api'
import ListItem from "./ListItem"
import Loading from './Loading'
import SearchError from "./SearchError"

const List = () => {
  const [selectedCities, setSelectedCities] = useState([])

  const cities = useSelector(state => state.cities)
  const offset = useSelector(state => state.offset)
  const loading = useSelector(state => state.searchLoading)
  const searchError = useSelector(state => state.searchError)

  const dispatch = useDispatch()
  const nextPage = () => dispatch(updateOffset(10))
  const prevPage = () => dispatch(updateOffset(-10))
  // const addFavorites = () => dispatch(setPreferences(selectedCities))

  const prevDisableCheck = () => offset === 0 ? true : false 
  const nextDisableCheck = () => offset + 10 >= cities.total ? true : false

  const addCity = (cityId) => {
    setSelectedCities([...selectedCities, cityId])
  }

  const removeCity = (cityId) => {
    setSelectedCities(selectedCities.filter(id => id !== cityId))
  }

  const handleSubmit = () => {
    // todo: 
    // add a loading component
    // after successful request do a new request for preferences to update that list
    // load a loading component there too
    updatePreferences(selectedCities, "ADD")
    .then(result => {
      // check for a 500 error, 500 errors will appear here!
      // unmount the loading component
      console.log(result)
    })
    .catch(error => {
      // 500 error code will not show up here
      // unmount the loading component
      // mount an error component
      // alert message to user that it was not successful
      console.log("error!", error)
    })
  }

  const renderList = () => {
    if (!cities.data) return
    return cities.data.map(city => {
      return <ListItem 
        city={city} 
        key={city.geonameid} 
        onCheck={addCity}
        onUncheck={removeCity}
      />
    })
  }

  return (
    <div className="list-container">
      <div>
        <button 
          onClick={prevPage} 
          disabled={prevDisableCheck()} >
          Prev
        </button>

        <button 
          onClick={nextPage} 
          disabled={nextDisableCheck()} >
          Next
        </button>
      </div>
      
      <div className="list-inner-container">

        <div>
          {loading ? (
            <Loading />
          ) : (
            searchError ? <SearchError /> : renderList()
          )}
        </div>
      </div>

      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default List