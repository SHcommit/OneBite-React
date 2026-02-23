import DiaryItem from "../../../components/DiaryItem";

/// 1.
/// 그냥 기본적인 데이터 순회하면서 key세팅
export default function MapBaseline({ items, sortType }) {
  const sorted = items.toSorted((p, n) => {
    if (sortType === "oldest")
      return Number(p.createdDate) - Number(n.createdDate);
    return Number(n.createdDate) - Number(p.createdDate);
  });

  return (
    <div className="List_wrapper">
      {sorted.map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
}
