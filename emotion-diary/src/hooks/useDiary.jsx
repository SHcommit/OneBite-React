import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (byId) => {
  const data = useContext(DiaryStateContext);
  const nav = useNavigate();
  const [diary, setDiary] = useState();

  useEffect(() => {
    const _diary = data.find((item) => String(item.id) === String(byId));

    if (!_diary) {
      window.alert("존재하지 않는 다이어리에요.");
      nav("/", { replace: true });
      return;
    }
    setDiary(_diary);
  }, [byId, diary]);

  return diary;
};

export default useDiary;
