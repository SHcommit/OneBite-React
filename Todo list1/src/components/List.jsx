import "./List.css";
import { useState, useMemo, useDeferredValue } from "react";
import TodoItem from "./TodoItem";

export default function List({ todos, onUpdate, onDelete }) {
  // const [searched, setSearched] = useState("");

  // const onChangeSearched = (e) => {
  //   setSearched(e.target.value);

  //   if (searched === "") {
  //     return todos;
  //   }
  // };

  // const getFilteredData = () => {
  //   if (searched === "") {
  //     return todos;
  //   }
  //   return todos.filter((todo) =>
  //     todo.content.toLowerCase().includes(searched.toLowerCase()),
  //   );
  // };

  // const filteredTodos = getFilteredData();

  // return (
  //   <div className="List">
  //     <h4>Todo list 😍</h4>
  //     <input
  //       value={searched}
  //       onChange={onChangeSearched}
  //       placeholder="검색어를 입력하세요"
  //     />
  //     <br />
  //     <div className="todos_wrapper">
  //       {filteredTodos.map((todo) => {
  //         return <TodoItem key={todo.id} {...todo} />;
  //       })}
  //     </div>
  //     <br />
  //   </div>
  // );

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
      <input
        value={searched}
        onChange={onChangeSearched}
        placeholder="검색어를 입력하세요"
      />
      <br />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete = {onDelete} />;
        })}
      </div>
      <br />
    </div>
  );
}
