import "../styles/global.css";
import items from "../data/items";
import ListItem from "./ListItem";
import CardItem from "./CardItem";

const ProductList = () => {
  return (
    <div className="product-list">
      {/* Sticky Header */}
      <div className="sticky-section">
        {/* 排序控制 */}
        <div className="list-controls">
          <input type="text"></input>
          <select className="sort-select control-btn">
            <option value="" hidden>
              Sort By
            </option>
            <option value="asc">價格由低到高</option>
            <option value="desc">價格由高到低</option>
          </select>
          <button className="filter-btn control-btn">Filter</button>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">價格範圍：</label>
            <div className="price-range">
              <input
                type="number"
                className="price-input"
                placeholder="最低價格"
                min="0"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                className="price-input"
                placeholder="最高價格"
                min="0"
              />
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">
              <input type="checkbox" className="stock-checkbox" />
              只顯示有庫存商品
            </label>
          </div>
        </div>

        {/* 表格標題 */}
        <div className="list-header">
          <div className="cell">商品名稱</div>
          <div className="cell">類別</div>
          <div className="cell">價格</div>
          <div className="cell">庫存</div>
        </div>
      </div>

      {/* 桌面版列表 */}
      <div className="list-content">
        {items.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </div>

      {/* 手機版卡片 */}
      <div className="card-view">
        {items.map((item) => (
          <CardItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
