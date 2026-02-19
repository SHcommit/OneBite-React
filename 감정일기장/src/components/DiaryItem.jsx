import Button from "./Button";
import { getEmotionImage } from "../util/get-emotion-image";
import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";

/// 여기서 중요한 것은 nav를 통해서 화면 전환을 한다! 이말임 nav(`/diary/${id}`) 이렇게 !!
const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`imageWrapper imageWrapper${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} alt="emotion" />
      </div>
      <div onClick={() => nav(`/diary/${id}`)} className="contentWrapper">
        <div className="date">{new Date(createdDate).toLocaleDateString()}</div>
        <div className="content">{content}</div>
      </div>
      <div className="buttonWrapper">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
