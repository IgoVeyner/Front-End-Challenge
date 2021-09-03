import { useSelector, useDispatch } from "react-redux"
import { updateOffset } from "../redux/actions/offsetActions"
import ListItem from "./ListItem"

const List = () => {
  const cities = useSelector(state => state.cities)
  const offset = useSelector(state => state.offset)

  const dispatch = useDispatch()
  const nextPage = () => dispatch(updateOffset(1))
  const prevPage = () => dispatch(updateOffset(-1))

  const prevDisableCheck = () => offset === 0 ? true : false 
  const nextDisableCheck = () => offset + 1 * 10 > cities.total ? true : false

  const renderList = () => {
    return cities.data.map(city => {
      return <ListItem city={city} key={city.geonameid}/>
    })
  }

  return (
    <div>
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

      <div>
        {cities.data ? renderList() : null}
      </div>
    </div>
  )
}

export default List