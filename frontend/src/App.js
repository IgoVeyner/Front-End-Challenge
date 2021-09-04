import './sass/app.sass';
import Header from './components/Header'
import SearchBarContainer from './components/SearchBarContainer';
import List from './components/List';
import Preferences from './components/Preferences';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBarContainer />
      <List />
      <Preferences />
    </div>
  );
}

export default App;
