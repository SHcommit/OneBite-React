export const MODES = [
  { value: "map", label: "1) map 기본 (정렬도 매번)" },
  { value: "map-memo", label: "2) map + useMemo 정렬" },
  {
    value: "map-memo-item",
    label: "3) map + useMemo 정렬 + React.memo(DiaryItem)",
  },
  { value: "virtual", label: "4) virtualization(windowing)" },
  { value: "infinite-map", label: "5) 무한스크롤(append) + map" },
  { value: "infinite-virtual", label: "6) 무한스크롤 + virtualization" },
];
