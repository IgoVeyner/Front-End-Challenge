import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleError } from '../services/errors'
import { getCities } from '../services/api'
import { setCities } from '../redux/actions/citiesActions'
import { setSearchError } from '../redux/actions/searchErrorActions'
import { setLoading } from "../redux/actions/searchLoadingActions"

const useSearch = () => {
  const offset = useSelector(state => state.offset)
  const searchTerm = useSelector(state => state.searchTerm)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    let ignore = false 

    const setBusy = () => dispatch(setLoading())
    const updateCities = (parsed) => dispatch(setCities(parsed, offset))
    const setSearchErrorToTrue = () => dispatch(setSearchError())
    
    async function getData() {
      setBusy()
      const response = await getCities(searchTerm, offset)
      if(!ignore) {
        if (response.statusCode === 500) {
          handleError(response, setSearchErrorToTrue) 
        } else {
          updateCities(response)
        }
      }
    }

    getData()

    return () => {ignore = true}
  }, [searchTerm, dispatch, offset]);
}

export default useSearch