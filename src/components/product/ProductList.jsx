import "../../styles/global.css";
import { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import CardItem from "./CardItem";
import FilteringSpinner from "../ui/FilteringSpinner";
import ToolbarSection from "../toolbar/ToolbarSection";
import ProductHeader from "./ProductHeader";
import LoadMore from "../ui/LoadMore";
import useVirtualScroll from "../../hooks/useVirtualScroll";
import useProductFilter from "../../hooks/useProductFilter";

const ProductList = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const stickyRef = useRef(null);

  // 篩選、排序邏輯
  const {
    // 資料
    categories,
    filteredItems,

    // 狀態
    searchName,
    selectedCategories,
    showInStock,
    priceRange,
    sortOrder,

    // handlers
    onSearch,
    onCategoryToggle,
    onStockToggle,
    onPriceChange,
    onSortOrder,
  } = useProductFilter();

  // 虛擬滾動邏輯
  const { displayCount, hasMore, loading } = useVirtualScroll(
    filteredItems.length
  );

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

  // 顯示商品列表
  const renderContent = () => {
    if (filtering) {
      return <FilteringSpinner />;
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
        {(hasMore || loading) && <LoadMore />}
      </div>
    );
  };

  return (
    <div className="product-list">
      <div className="desktop-products-count">{`Total Products: ${filteredItems.length}`}</div>
      {/* Sticky Header */}
      <div
        ref={stickyRef}
        className={`sticky-section ${isScrolled ? "no-radius" : ""}`}
      >
        {/* 排序、篩選控制 */}
        <ToolbarSection
          categories={categories}
          selectedCategories={selectedCategories}
          showInStock={showInStock}
          priceRange={priceRange}
          sortOrder={sortOrder}
          onSearch={onSearch}
          onCategoryToggle={onCategoryToggle}
          onStockToggle={onStockToggle}
          onPriceChange={onPriceChange}
          onSortOrder={onSortOrder}
        />

        {/* 列表標題 */}
        <ProductHeader />
      </div>
      <div className="mobile-products-count">{`Total Products: ${filteredItems.length}`}</div>

      {renderContent()}
    </div>
  );
};

export default ProductList;
