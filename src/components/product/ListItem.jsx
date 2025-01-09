/* eslint-disable react/prop-types */
const ListItem = ({ item }) => {
  return (
    <div className="list-row">
      <div className="cell">{item.name}</div>
      <div className="cell">{item.category}</div>
      <div className="cell">${item.price}</div>
      <div className="cell">{item.inStock ? "in stock" : "sold out"}</div>
    </div>
  );
};

export default ListItem;
