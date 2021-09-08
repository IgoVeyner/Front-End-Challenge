import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateOffset } from "../redux/actions/offsetActions"
import CitiesList from "./CitiesList"
import Loading from './Loading'
import Pagination from "./Pagination"
import SearchError from "./SearchError"
import { prevDisableCheck, nextDisableCheck } from '../services/pagination'
import useNextClick from "../hooks/useNextClick"
import usePrevClick from "../hooks/usePrevClick"

const CitiesListContainer = () => {
  const interval = useRef(null)
  const nextPageClicks = useRef(0)
  const prevPageClicks = useRef(0)

  const cities = useSelector(state => state.cities)
  const offset = useSelector(state => state.offset)
  const busy = useSelector(state => state.searchLoading)
  const error = useSelector(state => state.searchError)

  const dispatch = useDispatch()
  const updateCitiesOffset = (data) => dispatch(updateOffset(data))
  
  const disabledStatus = [
    prevDisableCheck(busy, error, cities, offset), 
    nextDisableCheck(busy, error, cities, offset)
  ]

  const nextPage = useNextClick(cities, offset, nextPageClicks, interval, updateCitiesOffset)
  const prevPage = usePrevClick(offset, prevPageClicks, interval, updateCitiesOffset)
  
  const renderInnerComponent = () => {
    if (busy) return <Loading />
    if (error) return <SearchError />
    return <CitiesList cities={cities} />
  }

  return (
    <div className="list-container"> 
      <Pagination 
        onNextClick={nextPage}
        onPrevClick={prevPage}
        disabledStatus={disabledStatus}
        results={cities}
        startValue={offset}
        busy={busy}
        error={error}
      />
      
      <div className="list-inner-container">
        {/* {renderInnerComponent()} */}
        <SearchError />
      </div>

    </div>
  )
}

export default CitiesListContainer