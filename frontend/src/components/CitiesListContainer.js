import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateOffset } from "../redux/actions/offsetActions"
import CitiesList from "./CitiesList"
import Loading from './Loading'
import Pagination from "./Pagination"
import SearchError from "./SearchError"
import { prevDisableCheck, nextDisableCheck } from '../services/pagination'

const CitiesListContainer = () => {
  const interval = useRef(null)
  const nextPageClicks = useRef(0)
  const prevPageClicks = useRef(0)

  const cities = useSelector(state => state.cities)
  const offset = useSelector(state => state.offset)
  const loading = useSelector(state => state.searchLoading)
  const searchError = useSelector(state => state.searchError)

  const dispatch = useDispatch()
  
  const disabledStatus = [
    prevDisableCheck(loading, searchError, cities, offset), 
    nextDisableCheck(loading, searchError, cities, offset)
  ]

  const onNextClick = () => {
    const nextPage = () => {
      const calulateMaxNumber = () => {
        return cities.total - cities.total % 10
      }

      const newOffset = Math.min(calulateMaxNumber() - offset, nextPageClicks.current * 10)
      dispatch(updateOffset(newOffset))
      nextPageClicks.current = 0
    }

    clearInterval(interval.current)
    nextPageClicks.current += 1
    updateInterval(nextPage, 500)
  }

  const onPrevClick = () => {
    const prevPage = () => {
      const newOffset = Math.max(0 - offset, prevPageClicks.current * -10)
      dispatch(updateOffset(newOffset))
      prevPageClicks.current = 0
    }

    clearInterval(interval.current)
    prevPageClicks.current += 1
    updateInterval(prevPage, 500)
  }

  const updateInterval = (callback, time) => {
    interval.current = setInterval(callback, time)
  }

  const renderInnerComponent = () => {
    if (loading) return <Loading />
    if (searchError) return <SearchError />
    return <CitiesList cities={cities} />
  }

  return (
    <div className="list-container"> 
      <Pagination 
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        disabledStatus={disabledStatus}
        results={cities}
        startValue={offset}
        busy={loading}
        error={searchError}
      />
      
      <div className="list-inner-container">
        {renderInnerComponent()}
      </div>

    </div>
  )
}

export default CitiesListContainer