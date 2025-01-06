const CardItem = ({ item }) => {
  return (
    <div className="card">
      <h3 className="card-title">{item.name}</h3>
      <div className="card-info">
        <p>類別: {item.category}</p>
        <p>價格: ${item.price}</p>
        <p>庫存: {item.inStock ? "有庫存" : "無庫存"}</p>
      </div>
    </div>
  );
};

export default CardItem;
