import { useEffect } from "react";

const Even = () => {
  useEffect(() => {
    // 정리 함수. 이제 이 컴포넌트가 해제될때.
    return () => {
      console.log("unmount");
    };
  }, []);

  return <div>짝수입니다</div>;
};

export default Even;
