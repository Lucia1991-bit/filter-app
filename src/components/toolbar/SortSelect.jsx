/* eslint-disable react/prop-types */
const SortSelect = ({ value, onChange }) => {
  return (
    <select
      className="sort-select control-btn"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" hidden>
        SORT BY
      </option>
      <option value="asc">From Lowest</option>
      <option value="desc">From Highest</option>
    </select>
  );
};
export default SortSelect;
