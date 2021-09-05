import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from "../redux/actions/preferencesLoadingActions"
import { setPreferences } from "../redux/actions/preferencesActions"
import { getPreferences } from "../services/api"
import useFetchRequest from "../hooks/useFetchRequest"
import FavoritesList from './FavoritesList'
import Loading from './Loading'

const FavoritesListContainer = () => {
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
        console.log(data)
        setFavorites(data)
      })
      .catch(error => {
        console.log(error)
      })
    }, [dispatch])

  useFetchRequest(loadPreferences)

  const renderInnerComponent = () => {
    if (loading) return <Loading />
    // TODO: error component and check for error
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