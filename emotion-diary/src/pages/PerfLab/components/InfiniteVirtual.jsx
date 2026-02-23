import { useCallback, useEffect } from "react";
import { List } from "react-window";
import DiaryItem from "../../../components/DiaryItem";
import { useInfiniteAppend } from "../hooks/useInfiniteAppend";

/// 무한 스크롤 굿
export default function InfiniteVirtual({
  total,
  chunk,
  itemHeight = 120,
  height = 700,
}) {
  const { items, hasMore, isLoading, loadMore, reset } = useInfiniteAppend({
    total,
    chunk,
  });

  useEffect(() => reset(), [reset]);

  const Row = useCallback(({ index, style, data }) => {
    const item = data[index];
    return (
      <div style={style}>
        <DiaryItem {...item} />
      </div>
    );
  }, []);

  const onItemsRendered = useCallback(
    ({ visibleStopIndex }) => {
      if (!hasMore || isLoading) return;
      if (visibleStopIndex >= items.length - 20) loadMore();
    },
    [hasMore, isLoading, items.length, loadMore],
  );

  return (
    <>
      <div className="List_wrapper" style={{ padding: 0 }}>
        <List
          height={height}
          width="100%"
          itemCount={items.length}
          itemSize={itemHeight}
          overscanCount={10}
          itemData={items}
          onItemsRendered={onItemsRendered}
        >
          {Row}
        </List>
      </div>

      <div style={{ padding: 12, fontSize: 12, opacity: 0.8 }}>
        {isLoading
          ? "loading..."
          : hasMore
            ? "scroll (virtual) to load more"
            : "done"}
      </div>
    </>
  );
}
