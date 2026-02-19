import { useState } from "react";

export const Counter = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      <h1>{state}</h1>
      <button
        onClick={() => {
          setState(state + 1);
        }}
      >
        증가
      </button>
    </div>
  );
};
