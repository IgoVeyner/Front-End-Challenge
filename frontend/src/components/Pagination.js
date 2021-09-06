import PaginationButton from "./PaginationButton"

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
        <PaginationButton 
          onClick={onPrevClick}
          status={prevDisabled}
          classNameArg="prev-button"
          text="<"
        />

        <div className="page-total">
          {renderResultsText()}
        </div>

        <PaginationButton
          onClick={onNextClick}
          status={nextDisabled}
          classNameArg='next-button'
          text=">"
        />
      </div>
  )
}

export default Pagination