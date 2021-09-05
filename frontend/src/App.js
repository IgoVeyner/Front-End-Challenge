import './sass/app.sass';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import CitiesListContainer from './components/CitiesListContainer';
import FavoritesListContainer from './components/FavoritesListContainer';
import { getFullPreferences } from './services/api';
import useFetchRequest from './hooks/useFetchRequest';
import AppLoading from './components/AppLoading';
import { setPreferences } from './redux/actions/preferencesActions';
import { handleFavoitesContainerError } from './services/errors';
import AppError from './components/AppError';

function App() {
  const [favoritesListId, setFavoritesListId] = useState(1)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const resetFavoritesList = () => {
    setFavoritesListId(favoritesListId + 1)
  }

  const getAllPreferences = useCallback(
    () => {
      const setFullPreferences = (data) => dispatch(setPreferences(data))

      setError(false)
      getFullPreferences()
      .then(resp => {
        // 500 status codes come back as false positive
        if (resp.statusCode === 500) {
          handleFavoitesContainerError(resp)
          setError(true)
        } else {
          setBusy(false)
          setFullPreferences(resp.data)
        }
      })
      .catch(error => {
        // does not catch 500 error
        handleFavoitesContainerError(error)
        setError(true)
      })
    },
    [dispatch],
  )

  const renderComponents = () => {
    if (error) return <AppError onPress={getAllPreferences} />
    if (busy) return <AppLoading />
    return (
      <>
        <Header />
        <SearchBar />
        <CitiesListContainer />
        <FavoritesListContainer 
          key={favoritesListId} 
          onPress={resetFavoritesList}
        /> 
      </>
    )
  }

  useFetchRequest(getAllPreferences)

  return (
    <div className="App">
      {renderComponents()}
    </div>
  );
}

export default App;
