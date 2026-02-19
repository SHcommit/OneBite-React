import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  /// viewDidLoad이후 데이터 주입
  const diary = useDiary(params.id);

  const onClickDelete = () => {
    const wannaDelete = window.confirm(
      "일기를 정말 삭제할까요?\n다시 복구되지 않습니다.",
    );
    if (wannaDelete) {
      onDelete(params.id);
      nav("/", { replace: true });
      return;
    }
  };

  const onSubmit = (input) => {
    if (!window.confirm("일기를 정말 수정할까요? ")) return;
    onUpdate(
      params.id,
      input.createdDate.getTime(),
      input.emotionId,
      input.content,
    );
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"< 뒤로 가기"}
          />
        }
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하게"} type={"negative"} />
        }
      />
      <Editor initialData={diary} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
