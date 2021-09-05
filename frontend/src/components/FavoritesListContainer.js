import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from "../redux/actions/preferencesLoadingActions"
import { setPreferences } from "../redux/actions/preferencesActions"
import { getPreferences } from "../services/api"
import useFetchRequest from "../hooks/useFetchRequest"
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'

const FavoritesListContainer = ({ onPress }) => {
  const [error, setError] = useState(false)

  const favorites = useSelector(state => state.preferences)
  const loading = useSelector(state => state.preferencesLoading)
  // TODO: Error handling selector

  const dispatch = useDispatch()
  
  const prevPage = () => {
    // TODO
  }

  const nextPage = () => {
    // TODO
  }

  const prevDisableCheck = () => {
    // TODO
  }

  const nextDisableCheck = () => {
    // TODO
  }
  
  const loadPreferences = useCallback(() => {
    const setPreferencesLoading = () => dispatch(setLoading())
    const setFavorites = (data) => dispatch(setPreferences(data))
    
    setPreferencesLoading()
      getPreferences()
      .then(data => {
        // TODO: error handling here
        if (data.statusCode === 500) {
          console.log("error!")
          setError(true)
        }
        console.log(data)
        setFavorites(data)
      })
      .catch(error => {
        // TODO: error handling here even though 500 error code wont be caught here
        console.log(error)
      })
    }, [dispatch])

  useFetchRequest(loadPreferences)

  const renderInnerComponent = () => {
    if (loading) return <Loading />
    if (error) return <FavoritesError onPress={onPress}/>
    return <FavoritesList favorites={favorites} />
  }
  
  return (
    <>
      <h2>Favorites</h2>

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
          {renderInnerComponent()}
        </div>
      </div>
    </>
  )
}

export default FavoritesListContainer