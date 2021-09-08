import { useSelector, useDispatch } from "react-redux"
import { updateOffset } from "../redux/actions/offsetActions"
import CitiesList from "./CitiesList"
import Loading from './Loading'
import Pagination from "./Pagination"
import SearchError from "./SearchError"
import usePagination from "../hooks/usePagination"

const CitiesListContainer = ({ onPress }) => {
  const cities = useSelector(state => state.cities)
  const offset = useSelector(state => state.offset)
  const busy = useSelector(state => state.searchLoading)
  const error = useSelector(state => state.searchError)

  const dispatch = useDispatch()
  const updateCitiesOffset = (data) => dispatch(updateOffset(data))

  const { disabledStatus, nextPage, prevPage } = usePagination(
    cities, offset, busy, error, updateCitiesOffset
  )

  const renderInnerComponent = () => {
    if (busy) return <Loading />
    if (error) return <SearchError onPress={onPress} />
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
        {renderInnerComponent()}
      </div>

    </div>
  )
}

export default CitiesListContainer