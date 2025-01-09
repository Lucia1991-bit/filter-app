const FilterButtons = ({
  categories,
  selectedCategories,
  showInStock,
  onCategoryToggle,
  onStockToggle,
}) => {
  return (
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
        className={`option-btn control-btn ${showInStock ? "active" : ""}`}
        onClick={onStockToggle}
      >
        In Stock
      </button>
    </div>
  );
};
export default FilterButtons;
