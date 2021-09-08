import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'
import Pagination from './Pagination'
import useGetPreferences from '../hooks/useGetPreferences'
import { updatePreferncesOffset } from '../redux/actions/preferencesOffsetActions'
import useNeedsReload from '../hooks/useNeedsReload'
import useOffsetUpdated from '../hooks/useOffsetUpdated'
import usePagination from '../hooks/usePagination'

const FavoritesListContainer = ({ onPress }) => {
  const [error, setError] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [busy, setBusy] = useState(true)

  const needsReload = useSelector(state => state.preferencesReload)
  const offset = useSelector(state => state.preferencesOffset)

  const dispatch = useDispatch()
  const updateOffset = (data) => dispatch(updatePreferncesOffset(data))

  const { disabledStatus, nextPage, prevPage } = usePagination(
    favorites, offset, busy, error, updateOffset
  )
  
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