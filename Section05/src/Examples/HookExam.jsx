import { useState } from "react";
import useInput from "../Hooks/useInput";

// 3개 팁
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 됨
// 2. 조건부로 호출될 수 없다.
// 3. 나만의 커스텀 훅을 직접 만들 수 있다.

const HookExam = () => {
  const [input, onChange] = useInput();
  const [input2, onChange2] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
      <input value={input2} onChange={onChange2} />
    </div>
  );
};

export default HookExam;
