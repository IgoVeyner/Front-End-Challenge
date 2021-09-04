import { useSelector } from 'react-redux'

const FavoritesList = () => {
  const favorites = useSelector(state => state.preferences)
  
  return (
    <div>
    
    </div>
  )
}

export default FavoritesList