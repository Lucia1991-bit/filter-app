const PriceRange = ({ value, onChange }) => {
  return (
    <div className="price-range">
      <input
        type="number"
        className="price-input"
        placeholder="Lowest Price"
        min="0"
        value={value.min}
        onChange={(e) => onChange("min", e.target.value)}
      />
      <span className="price-separator">-</span>
      <input
        type="number"
        className="price-input"
        placeholder="Highest Price"
        min="0"
        value={value.max}
        onChange={(e) => onChange("max", e.target.value)}
      />
    </div>
  );
};
export default PriceRange;
