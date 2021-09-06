const PaginationText = ({ results, startValue, busy, error }) => {
  const renderResultsText = () => {
    if (error) return 'error'
    if (busy) return '...' 
    
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
    <div className="page-total">
      {renderResultsText()}
    </div>
  )
}

export default PaginationText