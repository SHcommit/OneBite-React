import { useState } from "react";

/// 프롭스는 프로퍼티라는거야.
/// 우리가 함수 호출할 때 Bulb(on) 이렇게 하잖음
/// 근데 React에서는 jsx라는 문법을 쓰는데
/// <Bulb light={on}/> 이렇게 쓰라는거지

export const Bulb = () => {
  const [light, setLight] = useState(true);

  return (
    <div>
      {light ? (
        <h1 style={{ backgroundColor: "orange" }}>OFF</h1>
      ) : (
        <h1 style={{ backgroundColor: "gray" }}>ON</h1>
      )}
      <h1>{light ? "ON" : "OFF"}</h1>
      <button
        onClick={() => {
          setLight(!light);
        }}
      >
        전구 끄기/켜기
      </button>
    </div>
  );
};
