import { Bulb } from "./Bulb";
import { Counter } from "./Counter";

/// initialState, 상태변화 함수
/// 그런데 상태가 너무많으면 하나 상태 변경될 때 리렌더링되서 변화되지 않은 상태의 컴포넌트 또한
/// 변경되어버림.
/// 그래서 가능한한 한 컴포넌트엔 한스테이트
export default function UseStateExample() {
  return (
    <>
      <Bulb />
      <Counter />
    </>
  );
}
