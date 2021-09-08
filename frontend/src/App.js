import './sass/app.sass';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import CitiesListContainer from './components/CitiesListContainer';
import FavoritesListContainer from './components/FavoritesListContainer';
import AppLoading from './components/AppLoading';
import AppError from './components/AppError';
import useGetAllPreferences from './hooks/useGetAllPreferences';
import useUpdateKey from './hooks/useUpdateKey';

function App() {
  const renderComponents = () => {
    if (busy) return <AppLoading />
    if (error) return <AppError onPress={getAllPreferences} />
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

  const [busy, error, getAllPreferences] = useGetAllPreferences()
  const [searchBarId, resetSearchBar] = useUpdateKey()
  const [favoritesListId, resetFavoritesList] = useUpdateKey()

  return (
    <div className="App">
      {renderComponents()}
    </div>
  );
}

export default App;
