import Header from "../components/Header";
import Button from "../components/Button";

/// Props는 프로퍼티

/// 여러 데이터 매개변수로 전달해야 한다면 spread써서
export default function PropsExample() {
  const buttonProps = {
    text: "메일",
    color: "red",
    a: 1,
    b: 2,
    c: 3,
  };

  return (
    <>
      <Button text={"메일"} color={"red"} />
      <Button text={"카페"} />
      <Button text={"블로그"}>
        <div>자식 요소</div>
        <Header />
      </Button>
      <Button {...buttonProps} />
    </>
  );
}
