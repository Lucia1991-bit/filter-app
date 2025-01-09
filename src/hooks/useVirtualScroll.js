// hooks/useVirtualScroll.js
import { useState, useEffect, useCallback } from "react";

const useVirtualScroll = (totalItems, itemsPerPage = 15) => {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [loading, setLoading] = useState(false);

  // 檢查是否還有更多項目可以加載
  const hasMore = displayCount < totalItems;

  // 處理加載更多
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // 模擬加載時間
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + itemsPerPage, totalItems));
      setLoading(false);
    }, 300);
  }, [loading, hasMore, itemsPerPage, totalItems]);

  // 重置顯示數量（當過濾條件改變時）
  useEffect(() => {
    setDisplayCount(itemsPerPage);
  }, [totalItems, itemsPerPage]);

  // 設置滾動監聽
  useEffect(() => {
    const handleScroll = () => {
      // 檢查是否滾動到底部
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      // 當距離底部 100px 時開始加載下一批資料
      if (scrollHeight - scrollTop - clientHeight < 100) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return {
    displayCount,
    hasMore,
    loading,
  };
};

export default useVirtualScroll;
