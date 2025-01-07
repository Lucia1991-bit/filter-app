/* eslint-disable react/prop-types */
const CardItem = ({ item }) => {
  return (
    <div className="card">
      <h3 className="card-title">{item.name}</h3>
      <div className="card-info">
        <div className="info-item">
          <span className="info-label">category</span>
          <p>{item.category}</p>
        </div>
        <div className="info-item">
          <span className="info-label">price</span>
          <p>${item.price}</p>
        </div>
        <div className="info-item">
          <span className="info-label">stock</span>
          <p>{item.inStock ? "in stock" : "sold out"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
