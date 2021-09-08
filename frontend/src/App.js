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
import useUpdateKey from './hooks/useUpdateKey';

function App() {
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState(false)

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

  const [favoritesListId, resetFavoritesList] = useUpdateKey()
  const [searchBarId, resetSearchBar] = useUpdateKey()
  const getAllPreferences = useGetAllPreferences(setPreferences, setError, setBusy)
  useFetchRequest(getAllPreferences)

  return (
    <div className="App">
      {renderComponents()}
    </div>
  );
}

export default App;
