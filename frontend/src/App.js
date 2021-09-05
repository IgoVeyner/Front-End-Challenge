import './sass/app.sass';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import Preferences from './components/Preferences';
import CitiesListContainer from './components/CitiesListContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <CitiesListContainer />
      <Preferences />
    </div>
  );
}

export default App;
