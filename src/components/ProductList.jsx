import "../styles/global.css";
import { useMemo } from "react";
import items from "../data/items";
import ListItem from "./ListItem";
import CardItem from "./CardItem";
import ProductControls from "./ProductControls";

const ProductList = () => {
  // 從 items 取得唯一類別列表
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, [items]);

  return (
    <div className="product-list">
      {/* Sticky Header */}
      <div className="sticky-section">
        {/* 排序、篩選控制 */}
        <ProductControls categories={categories} />

        {/* 列表標題 */}
        <div className="list-header">
          <div className="cell">Product Name</div>
          <div className="cell">Category</div>
          <div className="cell">Price</div>
          <div className="cell">Stock</div>
        </div>
      </div>

      {/* 桌面版產品列表 */}
      <div className="list-content">
        {items.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </div>

      {/* 手機版產品卡片 */}
      <div className="card-view">
        {items.map((item) => (
          <CardItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
