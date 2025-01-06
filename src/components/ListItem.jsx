const ListItem = ({ item }) => {
  return (
    <div className="list-row">
      <div className="cell">{item.name}</div>
      <div className="cell">{item.category}</div>
      <div className="cell">${item.price}</div>
      <div className="cell">{item.inStock ? "有庫存" : "無庫存"}</div>
    </div>
  );
};

export default ListItem;
