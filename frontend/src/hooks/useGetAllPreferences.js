import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { getFullPreferences } from '../services/api'
import { handleFavoritesContainerError } from '../services/errors';

const useGetAllPreferences = (setPreferences, setError, setBusy) => {
  const dispatch = useDispatch()

  const getAllPreferences = useCallback(
    () => {
      const setFullPreferences = (data) => dispatch(setPreferences(data))

      setError(false)
      getFullPreferences()
      .then(resp => {
        // 500 status codes come back as false positive
        if (resp.statusCode === 500) {
          handleFavoritesContainerError(resp)
          setError(true)
        } else {
          setBusy(false)
          setFullPreferences(resp.data)
        }
      })
      .catch(error => {
        // does not catch 500 error
        handleFavoritesContainerError(error)
        setError(true)
      })
    },
    [dispatch, setPreferences, setError, setBusy],
  )

  return getAllPreferences
}

export default useGetAllPreferences