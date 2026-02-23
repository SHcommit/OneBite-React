import { useMemo } from "react";

import { List } from "react-window";
import { AutoSizer } from "react-virtualized-auto-sizer";

import DiaryItem from "../../../components/DiaryItem";

/// 스크롤 성능 중요할때
/// UIKit의 reusableDequeue와 비슷함
/// DOM 개수를 화면에 보이는 만큼으로 제한함
/// 예를들어 데이터 10,000개여도 화면에 보이는 아이템 수 12개라면, 그리고
/// 버퍼 (위 아래 빠르게 스크롤할경우) overscan 8개정도 이렇게 실제 DOM으로 렌더링함.
/// 즉 DOM 노드수가 대략 보이는 개수 + 버퍼로 고정됨 그래서 스크롤해도 DOM이 10,000개로 늘어나지 않음.

/// UIKit의 resuable view와 다른점은
/// 렌더링 창(window) 안에 들어오는 인덱스만 렌더 하는개념이 강함.
/// UI인스턴스 총량을 제한해서 성능 지킴.

/// FixedSizeList == 각 아이템 높이가 고정일때 가장 쉽고 빠르다.
/// react-window 동작 방식은
/// 1. 전체 리스트 높이 가짜 계산 totalHeight = itemCount * itemSize
/// 2. 실제 DOM에 보이는 거만 렌더.
/// 3. 대신 각 Row를 위치(position)로 정확히 꽂아 넣음
/// 4. 셀의 크기, 위치를 지정해준다는 뜻 근데 FixedSizeList는 높이나 width고정임.

/// 높이가 가변이라면? VariableSizeList를 사용하면 됨
/// 근데 렌더 후 DOM측정 -> size캐싱.. 변경시 resetAfterIndex호출되서 좀 복잡함.
/// 이땐 @tanstack/react-virtual 선호함

// 초기코드.. 이거 써도 어 더느려 overscan 8개로하니까 위 아래 16개 + 화면에보이는개수만큼만들어져서 더느린건감.,,
// 또 문제는 rowProps에 items를 바로 넣어줘서그럼.
function DiaryRow({ index, style, items }) {
  const item = items[index];
  if (!item) return <div style={style} />;

  return (
    <div style={{ ...style, boxSizing: "border-box", padding: "0 7px 0 0" }}>
      <DiaryItem {...item} />
    </div>
  );
}

export default function Virtualized({ items }) {
  const rowProps = useMemo(() => ({ items }), [items]);
  return (
    <List
      rowCount={items.length}
      rowHeight={120}
      rowComponent={DiaryRow}
      rowProps={rowProps}
      overscanCount={3}
    />
  );
}
