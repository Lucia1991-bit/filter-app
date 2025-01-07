import "../styles/global.css";
import { useState, useEffect, useMemo, useRef } from "react";
import items from "../data/items";
import ListItem from "./ListItem";
import CardItem from "./CardItem";
import ProductControls from "./ProductControls";

const ProductList = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showInStock, setShowInStock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const stickyRef = useRef(null);

  // 過濾商品列表
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const filteredByName = item.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      const filteredByCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      const filterdByStock = !showInStock || item.inStock;

      return filteredByName && filteredByCategories && filterdByStock;
    });
  }, [searchName, selectedCategories, showInStock]);

  // 從 items 取得不重複的類別列表
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, [items]);

  // 當搜尋條件改變時，設置 loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchName, selectedCategories, showInStock]);

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

  // 篩選按紐控制
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const handleStockToggle = () => {
    setShowInStock((prev) => !prev);
  };

  // 顯示商品列表
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading results...</p>
        </div>
      );
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
        <ProductControls
          categories={categories}
          selectedCategories={selectedCategories}
          showInStock={showInStock}
          onSearch={setSearchName}
          onCategoryToggle={handleCategoryToggle}
          onStockToggle={handleStockToggle}
        />

        {/* 列表標題 */}
        <div className="list-header">
          <div className="cell">Product Name</div>
          <div className="cell">Category</div>
          <div className="cell">Price</div>
          <div className="cell">Stock</div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default ProductList;
