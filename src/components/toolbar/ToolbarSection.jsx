/* eslint-disable react/prop-types */
import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import FilterButtons from "./FilterButtons";
import PriceRange from "./PriceRange";

const ToolbarSection = ({
  categories,
  selectedCategories,
  showInStock,
  priceRange,
  sortOrder,
  onSearch,
  onCategoryToggle,
  onStockToggle,
  onPriceChange,
  onSortOrder,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="list-controls">
        {/* 商品名稱搜尋 */}
        <SearchBar onSearch={onSearch} />
        {/* 價格高低排序 */}
        <SortSelect value={sortOrder} onChange={onSortOrder} />
        {/* 打開篩選選單 */}
        <button
          className={`filter-btn control-btn ${isDrawerOpen ? "active" : ""}`}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <LuFilter size={18} />
        </button>
      </div>

      {/* 篩選控制選單 */}
      {isDrawerOpen && (
        <div className="filter-drawer">
          {/* 類別、庫存篩選 */}
          <div className="filter-group">
            <label className="filter-label">Filter Category</label>
            <FilterButtons
              categories={categories}
              selectedCategories={selectedCategories}
              showInStock={showInStock}
              onCategoryToggle={onCategoryToggle}
              onStockToggle={onStockToggle}
            />
          </div>

          {/* 價格範圍篩選 */}
          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <PriceRange value={priceRange} onChange={onPriceChange} />
          </div>
        </div>
      )}
    </>
  );
};

export default ToolbarSection;
