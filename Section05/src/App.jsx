import "./App.css";
import PropsExample from "./Examples/PropsExample";
import UseStateExample from "./Examples/UseStateExample/UseStateExample";
import { Register } from "./Examples/RegisterExample/Register";
import { RegisterRefactor } from "./Examples/RegisterExample/RegisteRefactor";
import { RegisterUseRef } from "./Examples/RegisterExample/RegisteUseRef";
import HookExam from "./Examples/HookExam";

/// 앱 컴포넌트
export default function App() {
  return (
    <>
      {/* <PropsExample /> */}
      {/* <UseStateExample /> */}
      {/* <Register /> */}
      {/* <RegisterRefactor /> */}
      {/* <RegisterUseRef /> */}
      <HookExam />
    </>
  );
}
