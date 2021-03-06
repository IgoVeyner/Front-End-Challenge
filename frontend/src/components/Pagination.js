import PaginationButton from "./PaginationButton"
import PaginationText from "./PaginationText"

const Pagination = ({ 
    onPrevClick, onNextClick, disabledStatus, 
    results, startValue, busy, error
  }) => {
  const [prevDisabled, nextDisabled] = disabledStatus

  return (
      <div className="pagination">
        <PaginationButton 
          onClick={onPrevClick}
          status={prevDisabled}
          classNameArg="prev-button"
          text="<"
        />

        <PaginationText
          results={results}
          startValue={startValue}
          busy={busy}
          error={error}
        />

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