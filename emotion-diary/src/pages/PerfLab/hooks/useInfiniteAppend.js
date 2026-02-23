import { useCallback, useMemo, useState } from "react";
import { makeDummyDiaries } from "../utils/dummyData";

export function useInfiniteAppend({ total, chunk }) {
  const all = useMemo(() => makeDummyDiaries(total), [total]);
  const [visibleCount, setVisibleCount] = useState(Math.min(chunk, total));
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = visibleCount < total;

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    // 네트워크 흉내
    await new Promise((r) => setTimeout(r, 120));
    setVisibleCount((c) => Math.min(c + chunk, total));
    setIsLoading(false);
  }, [chunk, hasMore, isLoading, total]);

  const items = useMemo(() => all.slice(0, visibleCount), [all, visibleCount]);

  const reset = useCallback(() => {
    setVisibleCount(Math.min(chunk, total));
  }, [chunk, total]);

  return { items, hasMore, isLoading, loadMore, reset };
}
