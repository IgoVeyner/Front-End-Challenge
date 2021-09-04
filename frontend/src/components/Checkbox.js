const Checkbox = ({ checked }) => {
  const addCheckStyle = () => checked ? 'checkmark check' : 'checkmark'

  return (
    <div className="checkbox-container">
      <span className={addCheckStyle()}></span>
    </div>
  )
}

export default Checkbox