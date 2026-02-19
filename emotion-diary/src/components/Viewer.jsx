import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { selectableEmotions } from "../util/constants";
import { DiaryStateContext } from "../App";

const Viewer = ({ emotionId, content }) => {
  const emotionItem = selectableEmotions.find(
    (item) => String(item.emotionId) === String(emotionId),
  );

  return (
    <div className="Viewer">
      <section className="imageSection">
        <h4>오늘의 감정</h4>
        <div className={`imageWrapper imageWrapper${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="contentSection">
        <h4>오늘의 일기</h4>
        <div className="contentWrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
