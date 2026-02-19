import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/list";
import "./App.css";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function todosReducer(todos, action) {
  switch (action.type) {
    case "create":
      return [action.data, ...todos];
    case "update":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo,
      );
    case "delete":
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(todosReducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "create",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((id, isDone) => {
    dispatch({ type: "update", id: id });
  }, []);

  const onDelete = useCallback((id) => {
    dispatch({ type: "delete", id: id });
  }, []);

  /// TodoDispatchContext.Provider value에
  /// 직접 {onCreate, onUpdate, onDelete} 넣으면 App컴포넌트가 리렌더링되도
  /// onCreate, onUpdate, onDelete는 다시 생성 안됨

  const memoizedDispatch = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  }, []);

  return (
    <div>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
