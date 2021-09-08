import { useState, useRef } from 'react'
import { useSelector } from "react-redux"

const useChecked = (cityId) => {
  const favorites = useSelector(state => state.preferences)
  const initialState = favorites.includes(cityId) ? "CHECKED" : "UNCHECKED"

  const [checked, setChecked] = useState(initialState)
  const previousState = useRef(checked)

   return {
    checked,
    setChecked,
    previousState,
    handleClick: () => setChecked("PENDING")
  }
}

export default useChecked