const PaginationButton = ({ onClick, status, classNameArg, text }) => {
  return (
    <div className="page-button-container">
        <button 
          className={classNameArg}
          onClick={onClick} 
          disabled={status} >
          {`${text}`}
        </button>
      </div>
  )
}

export default PaginationButton