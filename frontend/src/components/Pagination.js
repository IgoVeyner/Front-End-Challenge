const Pagination = ({ 
    onPrevClick, onNextClick, disabledStatus, results, startValue 
  }) => {
  const [prevDisabled, nextDisabled] = disabledStatus

  const renderResultsText = () => {
    const {data, total} = results
    
    if (results.total) {
      const resultsEnd = Math.min(data.length + startValue, total)
      return (
        <div>
          <span>{startValue + 1}</span>
          -
          <span>{resultsEnd}</span>
          of
          <span>{total}</span>
        </div>
      )
    } 
  }

  return (
      <div className="pagination">
        <div className="page-button-container">
          <button 
            className="prev-button"
            onClick={onPrevClick} 
            disabled={prevDisabled} >
            Prev
          </button>
        </div>

        <div className="page-total">
          {renderResultsText()}
        </div>

        <div className="page-button-container">
          <button 
            className="next-button"
            onClick={onNextClick} 
            disabled={nextDisabled} >
            Next
          </button>
        </div>
      </div>
  )
}

export default Pagination