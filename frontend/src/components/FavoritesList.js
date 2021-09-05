import { useSelector } from 'react-redux'

const FavoritesList = () => {
  const favorites = useSelector(state => state.preferences)
  
  const prevPage = () => {
    // TODO
  }

  const nextPage = () => {
    // TODO
  }

  const prevDisableCheck = () => {
    // TODO
  }

  const nextDisableCheck = () => {
    // TODO
  }

  return (
    <div className="list-container">
      <div>
        <button 
          onClick={prevPage} 
          disabled={prevDisableCheck()} >
          Prev
        </button>

        <button 
          onClick={nextPage} 
          disabled={nextDisableCheck()} >
          Next
        </button>
      </div>

      <div className="list-inner-container">
  
      </div>
    </div>
  )
}

export default FavoritesList