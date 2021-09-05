const Pagination = ({ onPrevClick, onNextClick, disabledStatus}) => {
  const [prevDisabled, nextDisabled] = disabledStatus

  return (
      <div>
        <button 
          onClick={onPrevClick} 
          disabled={prevDisabled} >
          Prev
        </button>

        <button 
          onClick={onNextClick} 
          disabled={nextDisabled} >
          Next
        </button>
      </div>
  )
}

export default Pagination