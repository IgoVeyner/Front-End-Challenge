import './App.css';
import SearchBarContainer from './components/SearchBarContainer';
import List from './components/List';

function App() {
  // const [searchResults, setSearchResults] = useState({})

  // const updateSearchResults = (returnedResults) => {
  //   setSearchResults(returnedResults)
  // }

  return (
    <div className="App">
      <SearchBarContainer />
      <List />
    </div>
  );
}

export default App;
