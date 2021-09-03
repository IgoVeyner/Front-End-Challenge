import './App.css';
import { useState } from 'react'
import SearchBarContainer from './components/SearchBarContainer';
import List from './components/List';

function App() {
  const [searchResults, setSearchResults] = useState({})
  // TODO: add no results component / state test

  const updateSearchResults = (returnedResults) => {
    if (returnedResults.data.length > 0) {
      setSearchResults(returnedResults)
    } else {
      setSearchResults({})
    }
  }

  return (
    <div className="App">
      <SearchBarContainer onSubmit={updateSearchResults} />
      {searchResults.data && searchResults.data.length > 0 ? (
        <List cities={searchResults} />
      ) : null}
    </div>
  );
}

export default App;
