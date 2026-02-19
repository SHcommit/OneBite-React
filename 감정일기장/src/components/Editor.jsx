import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { selectableEmotions } from "../util/constants";
import getStringedDate from "../util/getStringedDate";

const Editor = ({ initialData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  useEffect(() => {
    if (!initialData) return;
    setInput({
      ...initialData,
      createdDate: new Date(Number(initialData.createdDate)),
    });
  }, [initialData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }
    setInput({ ...input, [name]: value });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="dateSection">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="moodSection">
        <h4>오늘의 감정</h4>
        <div className="emotionWrapper">
          {selectableEmotions.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: { name: "emotionId", value: item.emotionId },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="contentSection">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="footerSection">
        <Button text={"취소하기"} />
        <Button
          onClick={onClickSubmitButton}
          text={"작성완료"}
          type="positive"
        />
      </section>
    </div>
  );
};

export default Editor;
