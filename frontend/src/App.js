import './sass/app.sass';
import { useState } from 'react';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import CitiesListContainer from './components/CitiesListContainer';
import FavoritesListContainer from './components/FavoritesListContainer';
import useFetchRequest from './hooks/useFetchRequest';
import AppLoading from './components/AppLoading';
import { setPreferences } from './redux/actions/preferencesActions';
import AppError from './components/AppError';
import useGetAllPreferences from './hooks/useGetAllPreferences';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [searchBarId, setSearchBarId] = useState(uuidv4())
  const [favoritesListId, setFavoritesListId] = useState(1)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState(false)

  const resetFavoritesList = () => {
    setFavoritesListId(favoritesListId + 1)
  }

  const resetSearchBar = () => setSearchBarId(uuidv4())

  const renderComponents = () => {
    if (error) return <AppError onPress={getAllPreferences} />
    if (busy) return <AppLoading />
    return (
      <>
        <Header />
        <SearchBar key={searchBarId}/>
        <CitiesListContainer onPress={resetSearchBar} />
        <FavoritesListContainer 
          key={favoritesListId} 
          onPress={resetFavoritesList}
        /> 
      </>
    )
  }

  const getAllPreferences = useGetAllPreferences(setPreferences, setError, setBusy)
  useFetchRequest(getAllPreferences)

  return (
    <div className="App">
      {renderComponents()}
    </div>
  );
}

export default App;
