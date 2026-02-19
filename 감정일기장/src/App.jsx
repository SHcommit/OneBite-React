import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Diary from "./pages/Diary.jsx";
import NotFound from "./pages/NotFound.jsx";
import Edit from "./pages/Edit.jsx";
import Button from "./components/Button.jsx";

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2026-02-15").getTime(),
//     emotionId: 1,
//     content: "1번 일기 내용",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2026-02-14").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2026-01-14").getTime(),
//     emotionId: 3,
//     content: "3번 일기 내용",
//   },
// ];

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "init":
      return action.data;
    case "create":
      nextState = [action.data, ...state];
      break;
    case "update":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
      break;
    case "delete":
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    if (!parsedData || !Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }
    // console.log(parsedData);
    if (parsedData.length == 0) {
      return;
    }
    dispatch({
      type: "init",
      data: parsedData,
    });
    idRef.current = Math.max(...parsedData.map((e) => Number(e.id))) + 1;
    setIsLoading(false);
  }, []);

  /// 객체는 문자열로 변환해서 저장해야한다
  // localStorage.setItem("text", "hello");
  // localStorage.setItem("person", JSON.stringify({ name: "양승현" }));
  // console.log(localStorage.getItem("text"));
  // console.log(JSON.parse(localStorage.getItem("person")));
  // localStorage.removeItem("text");
  // localStorage.removeItem("person");

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "create",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "update",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "delete",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중이여유 ~ </div>;
  }

  /// 동적경로 /diary:id
  /// 라우터 경로에 edit/:id 이렇게 되어있으닉까
  ///   버튼 눌렀을때 edit으로 간다면
  /// ```
  /// <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
  /// ```
  /// 이렇게 edit/특정 아이디~ 했을때
  /// 받는 측에서 useParams().id를 사용하면 받을 수 있게되는거
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
