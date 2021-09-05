import './sass/app.sass';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import CitiesListContainer from './components/CitiesListContainer';
import FavoritesListContainer from './components/FavoritesListContainer';
import { getFullPreferences } from './services/api';
import useFetchRequest from './hooks/useFetchRequest';
import AppLoading from './components/AppLoading';
import { setPreferences } from './redux/actions/preferencesActions';

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

      getFullPreferences()
      .then(resp => {
        // TODO: error handling for 500 error codes
        if (resp.statusCode === 500) {
          // handle error here
          setError(true)
        } else {
          setBusy(false)
          setFullPreferences(resp)
        }
        console.log(resp)
      })
      .catch(error => {
        // TODO: error handling for non 500 codes
        console.log(error)
        setError(true)
      })
    },
    [],
  )

  const renderComponents = () => {
    if (error) return <div>Please try again!</div>
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
