const ListItem = ({ city }) => {
  return (
    <div>
      <input type="checkbox" />
      <h1>{city.name}</h1>
      <p>{city.subcountry}</p>
      <p>{city.country}</p>
    </div>
  )
}

export default ListItem