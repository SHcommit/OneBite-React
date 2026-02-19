import { useRef, useState } from "react";

/// 회원가입
/// 1. 이름
/// 2 생년월일
/// 3. 국적
/// 4. 자기소개

/// 스프레드 연산자 서 useState 여러개를 하나로!
export const RegisterUseRef = () => {
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  const countRef = useRef(0);
  const inputRef = useRef();
  console.log("Register 렌더링");

  const onChange = (e) => {
    const { name, value } = e.target;
    countRef.current++;
    console.log(countRef.current);
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    if (input.name === "") {
      // 이름을 입력하는 돔 요소에 포커싱하도록
      // 그렇다면 input name= name 요소에 접근해야함..
      // 이럴때 ref 객체 이용하자
      console.log(inputRef.current);
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={"이름"}
        />
        {input.name}
      </div>
      <div>
        <input
          name="birth"
          value={input.birth}
          type="date"
          onChange={onChange}
        />
      </div>

      <div>
        <select name="country" value={input.country} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {input.country}
      </div>
      <div>
        <textarea name="bio" value={input.bio} onChange={onChange}>
          자기소개
        </textarea>
        {input.bio}
      </div>
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};
