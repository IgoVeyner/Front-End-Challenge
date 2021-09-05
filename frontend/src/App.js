import './sass/app.sass';
import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import CitiesListContainer from './components/CitiesListContainer';
import FavoritesListContainer from './components/FavoritesListContainer';
import { getFullPreferences } from './services/api';
import useFetchRequest from './hooks/useFetchRequest';

function App() {
  const [favoritesListId, setFavoritesListId] = useState(1)

  const resetFavoritesList = () => {
    setFavoritesListId(favoritesListId + 1)
  }

  const getAllPreferences = useCallback(
    () => {
      getFullPreferences()
      .then(resp => {
        // TODO: error handling for 500 error codes
        console.log(resp)
      })
      .catch(error => {
        // TODO: error handling for non 500 codes
        console.log(error)
      })
    },
    [],
  )

  useFetchRequest(getAllPreferences)

  return (
    <div className="App">
      <Header />
      <SearchBar />
      <CitiesListContainer />
      <FavoritesListContainer 
        key={favoritesListId} 
        onPress={resetFavoritesList}
      />
    </div>
  );
}

export default App;
