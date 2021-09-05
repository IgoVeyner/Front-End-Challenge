import FavoritesListItem from "./FavoritesListItem"

const FavoritesList = ({ favorites }) => {
  const renderList = () => {
    if (!favorites.data) return 

    return favorites.data.map(id => {
      return <FavoritesListItem key={`fav-${id}`} id={id} />
    })
  }

  return (
    <>
      {renderList()}
    </>
  )
}

export default FavoritesList