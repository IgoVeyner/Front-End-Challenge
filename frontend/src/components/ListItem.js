import { useState } from 'react'
import Checkbox from "./Checkbox"

const ListItem = ({ city, onCheck, onUncheck }) => {
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    setChecked(!checked)
    !checked ? onCheck(city.geonameid) : onUncheck(city.geonameid)
  }

  return (
    <div className="list-item" onClick={handleClick}>
      <Checkbox 
        checked={checked} 
        onCheck={onCheck} 
        onUncheck={onUncheck} 
      />

      <div className="city-text-container">
        <h1 className="city-name">{city.name}</h1>

        <div className="city-text">
          {city.subcountry} - {city.country}
        </div>
      </div>
    </div>
  )
}

export default ListItem