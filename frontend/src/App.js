import './sass/app.sass';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import CitiesListContainer from './components/CitiesListContainer';
import FavoritesListContainer from './components/FavoritesListContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <CitiesListContainer />
      <FavoritesListContainer />
    </div>
  );
}

export default App;
