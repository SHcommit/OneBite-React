import { useReducer, useState } from "react";

const initialState = { name: "이름", birth: "", country: "", bio: "" };

function reducer(state, action) {
  switch (action.type) {
    case "change":
      return { ...state, [action.name]: action.value };
    default:
      return initialState;
  }
}

export const RegisterUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "change", name: name, value: value });
  };

  return (
    <div>
      <div>
        <input
          name="name"
          value={state.name}
          onChange={onChange}
          placeholder={"이름"}
        />
        {state.name}
      </div>
      <div>
        <input
          name="birth"
          value={state.birth}
          type="date"
          onChange={onChange}
        />
      </div>

      <div>
        <select name="country" value={state.country} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {state.country}
      </div>
      <div>
        <textarea name="bio" value={state.bio} onChange={onChange}>
          자기소개
        </textarea>
        {state.bio}
      </div>
    </div>
  );
};
