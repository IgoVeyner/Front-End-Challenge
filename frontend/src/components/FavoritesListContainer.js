import { useCallback, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPreferences } from "../services/api"
import { handleFavoitesContainerError } from '../services/errors'
import useFetchRequest from "../hooks/useFetchRequest"
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'
import { endPreferenceReload } from '../redux/actions/preferencesReloadActions'
import Pagination from './Pagination'
import { updatePreferncesOffset } from '../redux/actions/preferencesOffsetActions'

const FavoritesListContainer = ({ onPress }) => {
  const interval = useRef(null)
  const nextPageClicks = useRef(0)
  const prevPageClicks = useRef(0)

  const [error, setError] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [busy, setBusy] = useState(true)

  const needsReload = useSelector(state => state.preferencesReload)
  const offset = useSelector(state => state.preferencesOffset)

  const dispatch = useDispatch()
  const finishPreferencesReload = () => dispatch(endPreferenceReload())

  // TODO: 
  //      add conditional to make sure offset doesn't go out of bounds after
  //      removing a favorite

  const prevDisableCheck = () => {
    if (busy || error) return true
    return offset === 0 ? true : false
  }

  const nextDisableCheck = () => {
    if (busy || error) return true
    return offset + 10 >= favorites.total ? true : false
  }

  const disabledStatus = [prevDisableCheck(), nextDisableCheck()]

  const onNextClick = () => {
    const nextPage = () => {
      const calulateMaxNumber = () => {
        return favorites.total - favorites.total % 10
      }

      const newOffset = Math.min(calulateMaxNumber() - offset, nextPageClicks.current * 10)
      dispatch(updatePreferncesOffset(newOffset))
      nextPageClicks.current = 0
    }

    clearInterval(interval.current)
    nextPageClicks.current += 1
    updateInterval(nextPage, 500)
  }

  const onPrevClick = () => {
    const prevPage = () => {
      const newOffset = Math.max(0 - offset, prevPageClicks.current * -10)
      dispatch(updatePreferncesOffset(newOffset))
      prevPageClicks.current = 0
    }

    clearInterval(interval.current)
    prevPageClicks.current += 1
    updateInterval(prevPage, 500)
  }

  const updateInterval = (callback, time) => {
    interval.current = setInterval(callback, time)
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
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          disabledStatus={disabledStatus}
          results={favorites}
          startValue={offset}
          busy={busy}
          error={error}
        />

        <div className="list-inner-container">
          {renderInnerComponent()}
        </div>
      </div>
    </>
  )
}

export default FavoritesListContainer