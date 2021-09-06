import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPreferences } from "../services/api"
import { handleFavoitesContainerError } from '../services/errors'
import useFetchRequest from "../hooks/useFetchRequest"
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'
import { endPreferenceReload } from '../redux/actions/preferencesReloadActions'
import Pagination from './Pagination'

const FavoritesListContainer = ({ onPress }) => {
  const [error, setError] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [busy, setBusy] = useState(true)

  const needsReload = useSelector(state => state.preferencesReload)

  const dispatch = useDispatch()
  const finishPreferencesReload = () => dispatch(endPreferenceReload())

  const prevDisableCheck = () => {
    if (busy) return true
    // return offset === 0 ? true : false
    return true
  }

  const nextDisableCheck = () => {
    if (busy) return true
    return true
    // return offset + 10 >= favorites.total ? true : false
  }

  const disabledStatus = [prevDisableCheck(), nextDisableCheck()]
  
  const prevPage = () => {
    // TODO
  }

  const nextPage = () => {
    // TODO
  }

  const loadPreferences = useCallback(() => {
    getPreferences()
    .then(resp => {
      // 500 error code comes back as false positive so we need to error handle here
      if (resp.statusCode === 500) {
        handleFavoitesContainerError(resp)
        setBusy(false)
        setError(true)
      } else {
        setBusy(false)
        setFavorites(resp)
      }
    })
    .catch(error => {
      // does not catch 500 error code
      handleFavoitesContainerError(error)
    })
    }, []
  )

  if (needsReload) {
    setBusy(true)
    loadPreferences()
    finishPreferencesReload()
  }

  useFetchRequest(loadPreferences)

  const renderInnerComponent = () => {
    if (busy) return <Loading />
    if (error) return <FavoritesError onPress={onPress}/>
    return <FavoritesList favorites={favorites} />
  }
  
  return (
    <>
      <h2>Favorites</h2>

    <div className="list-container">
      <Pagination
        onNextClick={nextPage}
        onPrevClick={prevPage}
        disabledStatus={disabledStatus}
        results={favorites}
        // change to new Offset value in redux?
        startValue={0}
        busy={busy}
        error={error}
      />

      {/* 
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
        </div> */}

        <div className="list-inner-container">
          {renderInnerComponent()}
        </div>
      </div>
    </>
  )
}

export default FavoritesListContainer