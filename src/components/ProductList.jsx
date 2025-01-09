import "../styles/global.css";
import { useState, useEffect, useMemo, useRef } from "react";
import items from "../data/items";
import ListItem from "./ListItem";
import CardItem from "./CardItem";
import ProductControls from "./ProductControls";
import useVirtualScroll from "../hooks/useVirtualScroll";

const ProductList = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showInStock, setShowInStock] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOrder, setOrder] = useState("");
  const [filtering, setFiltering] = useState(false);
  const stickyRef = useRef(null);

  // 過濾商品列表
  const filteredItems = useMemo(() => {
    let filtered = items.filter((item) => {
      const filteredByName = item.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      const filteredByCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      const filterdByStock = !showInStock || item.inStock;

      const filteredByPrice =
        (!priceRange.min || item.price >= Number(priceRange.min)) &&
        (!priceRange.max || item.price <= Number(priceRange.max));

      return (
        filteredByName &&
        filteredByCategories &&
        filterdByStock &&
        filteredByPrice
      );
    });

    //排序邏輯
    if (sortOrder === "asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [
    priceRange.max,
    priceRange.min,
    searchName,
    selectedCategories,
    showInStock,
    sortOrder,
  ]);

  const { displayCount, hasMore, loading } = useVirtualScroll(
    filteredItems.length
  );

  // 從 items 取得不重複的類別列表
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, []);

  // 當搜尋條件改變時，設置 loading
  useEffect(() => {
    setFiltering(true);
    const timer = setTimeout(() => {
      setFiltering(false);
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

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({ ...prev, [type]: value }));
  };

  const handleSortOrder = (order) => {
    setOrder(order);
  };

  // 顯示商品列表
  const renderContent = () => {
    if (filtering) {
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
          <p>No Results Found</p>
        </div>
      );
    }

    //渲染可視範圍內的商品
    const itemsToShow = filteredItems.slice(0, displayCount);

    return (
      <div className="product-content">
        {/* 桌面版產品列表 */}
        <div className="list-content">
          {itemsToShow.map((item) => (
            <ListItem key={item.name} item={item} />
          ))}
        </div>

        {/* 手機版產品卡片 */}
        <div className="card-content">
          {itemsToShow.map((item) => (
            <CardItem key={item.name} item={item} />
          ))}
        </div>
        {/* 加載更多提示 */}
        {(hasMore || loading) && (
          <div className="loading-more">
            <span>Load More</span>
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        )}
      </div>
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
          priceRange={priceRange}
          sortOrder={sortOrder}
          onSearch={setSearchName}
          onCategoryToggle={handleCategoryToggle}
          onStockToggle={handleStockToggle}
          onPriceChange={handlePriceChange}
          onSortOrder={handleSortOrder}
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
