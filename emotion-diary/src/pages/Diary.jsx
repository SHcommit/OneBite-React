import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import getStringedDate from "../util/getStringedDate";

/// 블로그에쓰자 fiber관련해서
const Diary = () => {
  const nav = useNavigate();
  const { id } = useParams();
  // const [diary, setDiary] = useState();
  // const diaryStateContext = useContext(DiaryStateContext);
  // function getCurrentDiary() {
  //   return diaryStateContext.find((item) => String(item.id) === String(id));
  // }

  // useEffect(() => {
  //   const _diary = getCurrentDiary();
  //   if (!_diary) {
  //     window.alert("존재하지 않는 다이어리입니다.");
  //     nav("/", { replace: true });
  //     return;
  //   }
  //   setDiary(_diary);
  // }, [id, diaryStateContext]);

  const diary = useDiary(id);

  /// 스켈레톤ui 가튼그 보여주기 데이터로딩중
  if (!diary) return null;

  const { createdDate, emotionId, content } = diary;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
