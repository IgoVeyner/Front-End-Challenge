import FavoritesListItemContainer from "./FavoritesListItemContainer"
import NoResults from "./NoResults"

const FavoritesList = ({ favorites }) => {
  const renderList = () => {
    if (!favorites.data || (favorites.data && favorites.data.length === 0)) {
      return <NoResults text="No Favorites Yet! Add Some!"/>
    }

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