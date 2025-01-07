import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";

const ProductControls = ({ categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="list-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Product Name"
          />
          <LuSearch className="search-icon" size={18} />
        </div>
        <select className="sort-select control-btn">
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
                <button className="option-btn control-btn" key={category}>
                  {category}
                </button>
              ))}
              <button className="option-btn control-btn">In Stock</button>
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
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                className="price-input"
                placeholder="Highest Price"
                min="0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductControls;
