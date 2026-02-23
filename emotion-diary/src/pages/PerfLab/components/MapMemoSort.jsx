import { useMemo } from "react";
import DiaryItem from "../../../components/DiaryItem";

/// 2.
/// 기본 라인에 소팅에 대해서만 메모제이션.
/// 부모가 리렌더되도, items, sortType가 그대로라면, "정렬 연산" 은 다시 안한다.
/// 그런데 return sorted.map(...) 자체는 부모 컴포넌트 함수가 다시 실행되니까 얘도 다시 실행됨.
/// 즉, 자식 컴포넌트 DiaryItem의 리렌더 다시 발생할 수 있음.
/// 물론 React가 계산한 결과가 이전과 동일하면 DOM 변경(commit)이 거의 없을 수 있음

/// 그러니까 렌더 수, DOM 수는 map과 동일함.
/// 정렬 계산 비용만 줄이고, DOM도 그대로 1만개 다

/// 여기서는 정렬 연산만 방지 하지만, 자식 리렌더 방지는 x
export default function MapMemoSort({ items, sortType }) {
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
    <div className="List_wrapper">
      {sorted.map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
}
