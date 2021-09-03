import './App.css';
import { useState } from 'react'
import SearchBarContainer from './components/SearchBarContainer';

function App() {
  const [searchResults, setSearchResults] = useState([])
  // TODO: add no results component / state test

  const updateSearchResults = (returnedResults) => {
    if (returnedResults.data.length > 0) {
      setSearchResults(returnedResults)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="App">
      <SearchBarContainer onSubmit={updateSearchResults} />
    </div>
  );
}

export default App;
