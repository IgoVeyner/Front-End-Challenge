const Checkbox = ({ checked }) => {
  const addCheckStyle = () => {
    switch (checked) {
      case "CHECKED":
        return 'checkmark check'

      case "UNCHECKED":
        return 'checkmark'

      case "PENDING":
        return 'checkmark pending'

      default:
        return 'checkmark'
    }
  }

  return (
    <div className="checkbox-container">
      <span className={addCheckStyle()}></span>
    </div>
  )
}

export default Checkbox