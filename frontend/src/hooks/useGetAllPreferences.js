import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFullPreferences } from '../services/api'
import { handleFavoritesError } from '../services/errors';
import { setPreferences } from '../redux/actions/preferencesActions';

const useGetAllPreferences = () => {
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState(false)

  const getAllPreferences = () => setBusy(true)
  
  const dispatch = useDispatch()

  useEffect(() => {
    let ignore = false 
    const setFullPreferences = (data) => dispatch(setPreferences(data))

    async function getData() {
      const response = await getFullPreferences()
      if (!ignore) {

        if (response.statusCode === 500) {
          handleFavoritesError(response)
          setError(true)
        } else {
          setError(false)
          setFullPreferences(response.data)
        }
        setBusy(false)
      }
    }

    if (busy) getData()
    return () => {ignore = true}
  }, [dispatch, setBusy, setError, busy]);
  
  return [busy, error, getAllPreferences]
}

export default useGetAllPreferences