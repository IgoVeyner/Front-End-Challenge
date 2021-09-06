const Pagination = ({ onPrevClick, onNextClick, disabledStatus}) => {
  const [prevDisabled, nextDisabled] = disabledStatus

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
          {`Displaying results x - x of x`}
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