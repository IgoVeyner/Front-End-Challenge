import { useState } from 'react'
import Checkbox from "./Checkbox"

const ListItem = ({ city }) => {
  const [checked, setChecked] = useState(false)

  const handleClick = () => setChecked(!checked)

  return (
    <div className="list-item" onClick={handleClick}>
      <Checkbox checked={checked} />

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