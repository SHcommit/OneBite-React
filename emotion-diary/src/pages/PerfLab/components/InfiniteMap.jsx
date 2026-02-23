import { useEffect, useMemo, useRef } from "react";
import DiaryItem from "../../../components/DiaryItem";
import { useInfiniteAppend } from "../hooks/useInfiniteAppend";

/// 5. 이건 또 좀 초반엔 괜찮다가 점점 느려짐
export default function InfiniteMap({ total, chunk, sortType }) {
  const { items, hasMore, isLoading, loadMore, reset } = useInfiniteAppend({
    total,
    chunk,
  });
  const sentinelRef = useRef(null);

  useEffect(() => reset(), [reset]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const ob = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) loadMore();
      },
      { root: null, rootMargin: "200px", threshold: 0 },
    );

    ob.observe(el);
    return () => ob.disconnect();
  }, [loadMore]);

  const sorted = useMemo(() => {
    const copy = [...items];
    copy.sort((p, n) => {
      if (sortType === "oldest")
        return Number(p.createdDate) - Number(n.createdDate);
      return Number(n.createdDate) - Number(p.createdDate);
    });
    return copy;
  }, [items, sortType]);

  return (
    <>
      <div className="List_wrapper">
        {sorted.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
      <div ref={sentinelRef} style={{ height: 1 }} />
      <div style={{ padding: 12, fontSize: 12, opacity: 0.8 }}>
        {isLoading ? "loading..." : hasMore ? "scroll to load more" : "done"}
      </div>
    </>
  );
}
