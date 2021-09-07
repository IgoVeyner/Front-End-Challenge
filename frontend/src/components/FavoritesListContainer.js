import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'
import Pagination from './Pagination'
import useGetPreferences from '../hooks/useGetPreferences'
import useNextClick from '../hooks/useNextClick'
import usePrevClick from '../hooks/usePrevClick'
import { prevDisableCheck, nextDisableCheck } from '../services/pagination'
import { updatePreferncesOffset } from '../redux/actions/preferencesOffsetActions'
import useNeedsReload from '../hooks/useNeedsReload'
import useOffsetUpdated from '../hooks/useOffsetUpdated'

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
  const updateOffset = (data) => dispatch(updatePreferncesOffset(data))

  const disabledStatus = [
    prevDisableCheck(busy, error, favorites, offset), 
    nextDisableCheck(busy, error, favorites, offset)
  ]

  const nextPage = useNextClick(favorites, offset, nextPageClicks, interval, updateOffset)
  const prevPage = usePrevClick(offset, prevPageClicks, interval, updateOffset)
  
  useGetPreferences(offset, setError, setFavorites, needsReload, setBusy, busy)
  useNeedsReload(needsReload, setBusy)
  useOffsetUpdated(offset, setBusy)

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
          onNextClick={nextPage}
          onPrevClick={prevPage}
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