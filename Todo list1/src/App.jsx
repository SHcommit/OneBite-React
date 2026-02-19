import { useState, useRef, useReducer } from "react";
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

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(todosReducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    // const newTodo = {
    //   id: idRef.current++,
    //   isDone: false,
    //   content: content,
    //   date: new Date().getTime(),
    // };

    // setTodos([...todos, newTodo]);
    dispatch({
      type: "create",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (id, isDone) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    //   ),
    // );
    dispatch({ type: "update", id: id });
  };

  const onDelete = (id) => {
    // setTodos(todos.filter((todo) => todo.id !== id));
    dispatch({ type: "delete", id: id });
  };

  return (
    <div>
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
