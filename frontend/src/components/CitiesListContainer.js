import { useSelector, useDispatch } from "react-redux"
import { updateOffset } from "../redux/actions/offsetActions"
import CitiesList from "./CitiesList"
import Loading from './Loading'
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

  const renderInnerComponent = () => {
    if (loading) return <Loading />
    if (searchError) return <SearchError />
    return <CitiesList cities={cities} />
  }

  return (
    // TODO: Abstract this into new component
    <div className="list-container">
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
      </div>
      
      <div className="list-inner-container">
        {renderInnerComponent()}
      </div>

    </div>
  )
}

export default CitiesListContainer