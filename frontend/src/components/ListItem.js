import { useState, useEffect, useCallback, useRef } from 'react'
import Checkbox from "./Checkbox"
import { updatePreferences } from '../services/api'

const ListItem = ({ city }) => {
  const [checked, setChecked] = useState("UNCHECKED")
  const previousState = useRef(checked)
  const mounted = useRef(false)

  const handleClick = () => setChecked("PENDING")

  // TODO add error console message
  const onCheck = useCallback(() => {
    updatePreferences(city.geonameid, "ADD")
    .then(resp => {
      if (resp.status === 500) {
        setChecked("UNCHECKED")
      } else {
        previousState.current = "CHECKED"
        setChecked("CHECKED")
      }
    })
    .catch(error => {
      console.log(error)
    })
    }, [city.geonameid]
  )
  
  // TODO add error console message
  const onUncheck = useCallback(() => {
    updatePreferences(city.geonameid, "REMOVE")
    .then(resp => {
      if (resp.status === 500) {
        setChecked("CHECKED")
      } else {
        previousState.current = "UNCHECKED"
        setChecked("UNCHECKED")
      }
    })
    .catch(error => {
      console.log(error)
    })
    }, [city.geonameid]
  )

  // TODO: move to custom hook
  useEffect(() => {
    if (mounted.current) {
      if (checked === "PENDING") {
        previousState.current === "UNCHECKED" ? onCheck() : onUncheck()
      }
    } else {
      mounted.current = true
    }
  }, [checked, onCheck, onUncheck])

  return (
    <div className="list-item" onClick={handleClick}>
      <Checkbox 
        checked={checked} 
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