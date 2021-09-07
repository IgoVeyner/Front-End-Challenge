import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import FavoritesList from './FavoritesList'
import Loading from './Loading'
import FavoritesError from './FavoritesError'
import Pagination from './Pagination'
import useGetPreferences from '../hooks/useGetPreferences'
import useCancelableFetch from '../hooks/useCancelableFetch'
import useNextClick from '../hooks/useNextClick'
import usePrevClick from '../hooks/usePrevClick'
import { prevDisableCheck, nextDisableCheck } from '../services/pagination'

const FavoritesListContainer = ({ onPress }) => {
  const interval = useRef(null)
  const nextPageClicks = useRef(0)
  const prevPageClicks = useRef(0)

  const [error, setError] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [busy, setBusy] = useState(true)

  const needsReload = useSelector(state => state.preferencesReload)
  const offset = useSelector(state => state.preferencesOffset)

  const disabledStatus = [
    prevDisableCheck(busy, error, favorites, offset), 
    nextDisableCheck(busy, error, favorites, offset)
  ]

  const nextPage = useNextClick(favorites, offset, nextPageClicks, interval)
  const prevPage = usePrevClick(offset, prevPageClicks, interval)
  
  const getPreferences = useGetPreferences(setBusy, setError, setFavorites, needsReload)
  useCancelableFetch(getPreferences)

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