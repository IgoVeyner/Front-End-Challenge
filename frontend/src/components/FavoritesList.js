import FavoritesListItemContainer from "./FavoritesListItemContainer"

const FavoritesList = ({ favorites }) => {
  const renderList = () => {
    if (!favorites.data) return 

    return favorites.data.map(id => {
      return <FavoritesListItemContainer key={`fav-${id}`} id={id} />
    })
  }

  return (
    <>
      {renderList()}
    </>
  )
}

export default FavoritesList