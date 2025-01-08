/* eslint-disable react/prop-types */
import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";

const ProductControls = ({
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
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchInput);
    }
  };

  return (
    <>
      <div className="list-controls">
        <div className="search-wrapper">
          <input
            type="text"
            value={searchInput}
            className="search-input"
            placeholder="Product Name"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="search-btn"
            onClick={handleSubmitSearch}
            aria-label="Search"
          >
            <LuSearch size={18} />
          </button>
        </div>
        <select
          className="sort-select control-btn"
          value={sortOrder}
          onChange={(e) => onSortOrder(e.target.value)}
        >
          <option value="" hidden>
            SORT BY
          </option>
          <option value="asc">From Lowest</option>
          <option value="desc">From Highest</option>
        </select>
        <button
          className={`filter-btn control-btn ${isDrawerOpen ? "active" : ""}`}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <LuFilter size={18} />
        </button>
      </div>

      {isDrawerOpen && (
        <div className="filter-drawer">
          <div className="filter-group">
            <label className="filter-label">Filter Category</label>
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  className={`option-btn control-btn ${
                    selectedCategories.includes(category) ? "active" : ""
                  }`}
                  key={category}
                  onClick={() => onCategoryToggle(category)}
                >
                  {category}
                </button>
              ))}
              <button
                className={`option-btn control-btn ${
                  showInStock ? "active" : ""
                }`}
                onClick={onStockToggle}
              >
                In Stock
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <div className="price-range">
              <input
                type="number"
                className="price-input"
                placeholder="Lowest Price"
                min="0"
                value={priceRange.min}
                onChange={(e) => onPriceChange("min", e.target.value)}
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                className="price-input"
                placeholder="Highest Price"
                min="0"
                value={priceRange.max}
                onChange={(e) => onPriceChange("max", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductControls;
