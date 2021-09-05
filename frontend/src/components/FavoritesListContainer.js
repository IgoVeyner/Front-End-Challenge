import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from "../redux/actions/preferencesLoadingActions"
import { setPreferences } from "../redux/actions/preferencesActions"
import { getPreferences } from "../services/api"
import { handleFavoitesContainerError } from '../services/errors'
import { finishLoading } from '../redux/actions/preferencesLoadingActions'
import useFetchRequest from "../hooks/useFetchRequest"
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'

const FavoritesListContainer = ({ onPress }) => {
  const [error, setError] = useState(false)

  const favorites = useSelector(state => state.preferences)
  const loading = useSelector(state => state.preferencesLoading)

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
    const setFinishLoading = () => dispatch(finishLoading())
    
    setPreferencesLoading()
      getPreferences()
      .then(resp => {
        // 500 error code comes back as false positive so we need to error handle here
        if (resp.statusCode === 500) {
          handleFavoitesContainerError(resp)
          setFinishLoading()
          setError(true)
        } else {
          setFavorites(resp)
        }
      })
      .catch(error => {
        // does not catch 500 error code
        handleFavoitesContainerError(error)
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