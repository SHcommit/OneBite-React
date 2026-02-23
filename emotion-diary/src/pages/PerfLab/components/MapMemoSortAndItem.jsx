import React, { useMemo } from "react";
import DiaryItem from "../../../components/DiaryItem";

const MemoDiaryItem = React.memo(DiaryItem);

/// 3.
/// 2.는 결국 sorted연산에 대한 메모제이션 작업만 한거임
/// 그럼에도 상위 컴포넌트가 리렌더되면 자식 컴포넌트도 다시 리렌더 되야함
/// "컴포넌트를 메모하자."
/// React.memo()
/// props가 이전과 동일하다면, DiaryItem함수 호출을 스킵한다. 

/// 즉 부모가 렌더 될때 props가 같다면,
/// sort스킵, map은 돌지만, diaryItem render가 스킵.
/// 정확히는 React.memo는 
/// id, createdDate, emotionId, content이거를 각각 비교한다. 
/// 새 객체 매번 생성하거나, 매번 새 함수 전달하면 <MemoDiaryItem onClick={()=>handleClick(item.id)}/> 
/// 클로저에 의한 props는 매번 새로워지기때문에, useCallback써야한다. 

/// 아이템 1만개 중에 4천개만 바뀐다면? 6천개 안바끼면 그 동일한 아이템들 렌더 함수 호출은 스킵
/// 그러나 정렬 결과가 바뀌면 React 가 DOM 재배치할 수 있는데 그거 비용 마이듬
export default function MapMemoSortAndItem({ items, sortType }) {
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
        <MemoDiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
}
