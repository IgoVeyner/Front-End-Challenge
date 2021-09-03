import './App.css';
import Header from './components/Header'
import SearchBarContainer from './components/SearchBarContainer';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBarContainer />
      <List />
    </div>
  );
}

export default App;
