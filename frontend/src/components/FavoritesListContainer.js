import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'
import Pagination from './Pagination'
import { updatePreferncesOffset } from '../redux/actions/preferencesOffsetActions'
import useGetPreferences from '../hooks/useGetPreferences'

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
  
  useGetPreferences(setBusy, setError, setFavorites, needsReload)

  const renderInnerComponent = () => {
    if (busy) return <Loading />
    if (error) return <FavoritesError onPress={onPress}/>
    return <FavoritesList favorites={favorites} />
  }
  
  return (
    <>
      <div className="subheader">View all favorites</div>

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