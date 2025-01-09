import { useState, useMemo } from "react";
import items from "../data/items";

const useProductFilter = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showInStock, setShowInStock] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOrder, setOrder] = useState("");

  // 從 items 取得不重複的類別列表
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, []);

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

    // 根據排序條件排序
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

  return {
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
    onSearch: setSearchName,
    onCategoryToggle: handleCategoryToggle,
    onStockToggle: handleStockToggle,
    onPriceChange: handlePriceChange,
    onSortOrder: handleSortOrder,
  };
};

export default useProductFilter;
