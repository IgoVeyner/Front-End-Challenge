import './sass/app.sass';
import { useState } from 'react';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import CitiesListContainer from './components/CitiesListContainer';
import FavoritesListContainer from './components/FavoritesListContainer';

function App() {
  const [favoritesListId, setFavoritesListId] = useState(1)

  const resetFavoritesList = () => {
    setFavoritesListId(favoritesListId + 1)
  }

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
