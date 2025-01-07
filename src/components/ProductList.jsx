import "../styles/global.css";
import { useState, useEffect, useMemo, useRef } from "react";
import items from "../data/items";
import ListItem from "./ListItem";
import CardItem from "./CardItem";
import ProductControls from "./ProductControls";

const ProductList = () => {
  //管理 Header 是否需要改變樣式
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const stickyRef = useRef(null);

  // 過濾商品列表
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase().trim())
    );
  }, [searchName]);

  // 從 items 取得不重複的類別列表
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, [items]);

  // 當搜尋條件改變時，設置 loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchName]);

  // 監測滾動事件，判斷是否改變 Header 圓角樣式
  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect();
        setIsScrolled(top === 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderContent = () => {
    {
      /* 載入中 */
    }
    if (isLoading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading results...</p>
        </div>
      );
    }

    {
      /* 沒有搜尋結果 */
    }
    if (filteredItems.length === 0) {
      return (
        <div className="no-results">
          <p>{`No results found for ${searchName}`}</p>
        </div>
      );
    }

    return (
      <>
        {/* 桌面版產品列表 */}
        <div className="list-content">
          {filteredItems.map((item) => (
            <ListItem key={item.name} item={item} />
          ))}
        </div>

        {/* 手機版產品卡片 */}
        <div className="card-view">
          {filteredItems.map((item) => (
            <CardItem key={item.name} item={item} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="product-list">
      {/* Sticky Header */}
      <div
        ref={stickyRef}
        className={`sticky-section ${isScrolled ? "no-radius" : ""}`}
      >
        {/* 排序、篩選控制 */}
        <ProductControls categories={categories} onSearch={setSearchName} />

        {/* 列表標題 */}
        <div className="list-header">
          <div className="cell">Product Name</div>
          <div className="cell">Category</div>
          <div className="cell">Price</div>
          <div className="cell">Stock</div>
        </div>
      </div>

      {/* 顯示搜尋結果 */}
      {renderContent()}
    </div>
  );
};

export default ProductList;
