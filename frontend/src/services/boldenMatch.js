import { v4 as uuidv4 } from 'uuid';

const checkForMatch = (word, searchTerm) => {
  if (searchTerm.trim() === "") return word
  const position = word.toLowerCase().search(searchTerm.toLowerCase())
  return position !== -1 ? boldenMatch(word, position, searchTerm) : word
}

const boldenMatch = (word, startPosition, searchTerm) => {
  const endPosition = startPosition + searchTerm.length

  const preBold = word.slice(0, startPosition)
  const bolden = word.slice(startPosition, endPosition)
  const postBold = word.slice(endPosition, word.length)
  
  return [preBold, bolden, postBold].map((word, index) => {
    return spanifyAndBolden(word, index === 1)
  })
}

const spanifyAndBolden = (word, bold) => {
  if (word.length === 0) return null 
  if (bold) return <span key={uuidv4()} className='bold'>{word}</span>
  return <span key={uuidv4()}>{word}</span>
}

export default checkForMatch