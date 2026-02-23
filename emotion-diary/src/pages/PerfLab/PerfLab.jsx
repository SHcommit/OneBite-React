import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Button from "../../components/Button";
import "../../components/DiaryList.css";

import { MODES } from "./modes";
import { makeDummyDiaries } from "./utils/dummyData";
// import { usePerfMeasure } from "./hooks/usePerfMeasure";

import MapBaseline from "./components/MapBaseline";
import MapMemoSort from "./components/MapMemoSort";
import MapMemoSortAndItem from "./components/MapMemoSortAndItem";
import Virtualized from "./components/Virtualized";
import InfiniteMap from "./components/InfiniteMap";
import InfiniteVirtual from "./components/InfiniteVirtual";

export default function PerfLab() {
  const [mode, setMode] = useState("map");
  const [sortType, setSortType] = useState("latest");
  const [count, setCount] = useState(10000);
  const data = makeDummyDiaries(count);

  const renderBody = () => {
    switch (mode) {
      case "map":
        return <MapBaseline items={data} sortType={sortType} />;
      case "map-memo":
        return <MapMemoSort items={data} sortType={sortType} />;
      case "map-memo-item":
        return <MapMemoSortAndItem items={data} sortType={sortType} />;
      case "virtual":
        return <Virtualized items={data} />;
      case "infinite-map":
        return <InfiniteMap total={count} chunk={30} sortType={sortType} />;
      case "infinite-virtual":
        return <InfiniteVirtual total={count} chunk={30} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Header
        title={"성능 실험실 (/perf)"}
        leftChild={<div />}
        rightChild={<div />}
      />
      <div style={{ display: "grid", gap: 10, padding: "12px 0" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            모드
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              {MODES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            정렬
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
            </select>
          </label>

          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            총 개수
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              <option value={1000}>1,000</option>
              <option value={5000}>5,000</option>
              <option value={10000}>10,000</option>
              <option value={20000}>20,000</option>
            </select>
          </label>
        </div>
      </div>
      <div
        style={{
          minHeight: 0,
          flex: 1,
        }}
      >
        {renderBody()}
      </div>
    </div>
  );
}
