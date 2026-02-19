import { useState } from "react";

/// 컴포넌트에서만 useState같은 훅이 사용가능함 그래서 일반  함수에서는 useState사용 불가능함.
// function getInput() {
//// 에러나지요~
//   const [input, setInput] = useState("");

//   const onChange = (e) => {
//     setInput(e.target.value);
//   };

//   return [input, onChange];
// }

/// 그렇다면 커스텀 훅으로 만들면 훅 함수안에 훅 사용가능함
export default function useInput() {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return [input, onChange];
}
