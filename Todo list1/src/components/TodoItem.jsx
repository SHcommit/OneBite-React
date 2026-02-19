import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id, !isDone);
  };

  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => onChangeCheckbox()}
        value={isDone === true ? "checked" : ""}
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
};

export default TodoItem;
