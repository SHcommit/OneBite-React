import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${isSelected ? `EmotionItemOn${emotionId}` : ""}`}
    >
      <img
        className="emotionImage"
        src={getEmotionImage(emotionId)}
        alt="emotion"
      />
      <div className="emotionName">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
