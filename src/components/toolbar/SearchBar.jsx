/* eslint-disable react/prop-types */
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

const SearchBar = ({ onSearch }) => {
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
  );
};

export default SearchBar;
