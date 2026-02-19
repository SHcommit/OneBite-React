import { useState } from "react";

/// 회원가입
/// 1. 이름
/// 2 생년월일
/// 3. 국적
/// 4. 자기소개
export const Register = () => {
  const [name, setName] = useState("이름");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  const onChangeName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onCHangeBio = (e) => {
    setBio(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} placeholder={"이름"} />
        {name}
      </div>
      <div>
        <input value={birth} type="date" onChange={onChangeBirth} />
      </div>

      <div>
        <select value={country} onChange={onChangeCountry}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {country}
      </div>
      <div>
        <textarea value={bio} onChange={onCHangeBio}>
          자기소개
        </textarea>
        {bio}
      </div>
    </div>
  );
};
