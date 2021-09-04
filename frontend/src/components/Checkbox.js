const Checkbox = ({ checked }) => {
  const addCheckStyle = () => checked ? 'checkmark check' : 'checkmark'
  
  return (
    <div className="checkbox-container">
      <input 
        type="checkbox" 
        className="input-checkbox"
        checked={checked}
      />
      <span className={addCheckStyle()}></span>
    </div>
  )
}

export default Checkbox