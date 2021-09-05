import './sass/app.sass';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import List from './components/List';
import Preferences from './components/Preferences';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <List />
      <Preferences />
    </div>
  );
}

export default App;
