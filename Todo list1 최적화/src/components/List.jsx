import "./List.css";
import { useState, useMemo, useDeferredValue, useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoStateContext } from "../App";

export default function List() {
  const todos = useContext(TodoStateContext);

  /// 수치를 비교해보는 그런거 만들어보자
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((t) => t.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return { totalCount, doneCount, notDoneCount };
  }, [todos]);

  const [searched, setSearched] = useState("");

  const deferredSearched = useDeferredValue(searched);
  const filteredTodos = useMemo(() => {
    const transformed = deferredSearched.toLowerCase();
    if (!transformed) {
      return todos;
    }

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(transformed),
    );
  }, [todos, deferredSearched]);

  const onChangeSearched = (e) => setSearched(e.target.value);

  return (
    <div className="List">
      <h4>Todo list 😍</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>not done: {notDoneCount}</div>
      </div>

      <input
        value={searched}
        onChange={onChangeSearched}
        placeholder="검색어를 입력하세요"
      />
      <br />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
      <br />
    </div>
  );
}
