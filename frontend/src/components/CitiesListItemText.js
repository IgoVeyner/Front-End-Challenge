import { useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';

const CitiesListItemText = ({ data }) => {
  const {name, subcountry, country} = data
  const searchTerm = useSelector(state => state.searchTerm)

  const checkForMatch = (word) => {
    if (searchTerm.trim() === "") return word
    const position = word.toLowerCase().search(searchTerm.toLowerCase())
    return position !== -1 ? boldenMatch(word, position) : word
  } 

  const boldenMatch = (word, startPosition) => {
    const endPosition = startPosition + searchTerm.length

    const preBold = word.slice(0, startPosition)
    const bolden = word.slice(startPosition, endPosition)
    const postBold = word.slice(endPosition, word.length)
    
    return [preBold, bolden, postBold].map((word, index) => {
      return spanifyAndBolden(word, index === 1)
    })
  }

  const spanifyAndBolden = (word, bold) => {
    if (bold) return <span key={uuidv4()} className='bold'>{word}</span>
    return <span key={uuidv4()}>{word}</span>
  }
  
  return (
    <div className="city-text-container">
      <h1 className="city-name">{checkForMatch(name)}</h1>

      <div className="city-text">
        {checkForMatch(subcountry)} - {checkForMatch(country)}
      </div>
    </div>
  )
}

export default CitiesListItemText