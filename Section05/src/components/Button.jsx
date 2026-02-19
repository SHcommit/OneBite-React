/// props에 기본값 할당하는 방법
export default function Button({ children, text, color = "black" }) {
  const onClickButton = (e) => {
    console.log(text);
    console.log(e);
  };

  return (
    <button
      onClick={onClickButton}
      // onMouseEnter={onClickButton}
      style={{ color: color }}
    >
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
}

// Button.defaultProps = {
//   color: "blue",
// };
