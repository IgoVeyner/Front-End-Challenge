import { useSelector, useDispatch } from "react-redux"
import { updateOffset } from "../redux/actions/offsetActions"
import CitiesList from "./CitiesList"
import Loading from './Loading'
import Pagination from "./Pagination"
import SearchError from "./SearchError"

const CitiesListContainer = () => {
  const cities = useSelector(state => state.cities)
  const offset = useSelector(state => state.offset)
  const loading = useSelector(state => state.searchLoading)
  const searchError = useSelector(state => state.searchError)

  const dispatch = useDispatch()
  const nextPage = () => dispatch(updateOffset(10))
  const prevPage = () => dispatch(updateOffset(-10))

  const prevDisableCheck = () => offset === 0 ? true : false 
  const nextDisableCheck = () => offset + 10 >= cities.total ? true : false

  const disabledStatus = [prevDisableCheck(), nextDisableCheck()]

  const renderInnerComponent = () => {
    if (loading) return <Loading />
    if (searchError) return <SearchError />
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