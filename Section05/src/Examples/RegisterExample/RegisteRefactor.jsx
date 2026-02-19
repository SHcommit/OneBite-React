import { useState } from "react";

/// 회원가입
/// 1. 이름
/// 2 생년월일
/// 3. 국적
/// 4. 자기소개

/// 스프레드 연산자 서 useState 여러개를 하나로!
export const RegisterRefactor = () => {
  const [input, setInput] = useState({
    name: "이름",
    birth: "",
    country: "",
    bio: "",
  });

  console.log(input);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <input
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
          onChange={onchange}
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
    </div>
  );
};
