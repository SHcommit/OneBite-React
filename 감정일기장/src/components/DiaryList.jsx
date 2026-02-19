import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((p, n) => {
      if (sortType === "oldest") {
        return Number(p.createdDate) - Number(n.createdDate);
      } else {
        return Number(n.createdDate) - Number(p.createdDate);
      }
    });
  };

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"positive"}
        />
      </div>
      <div className="List_wrapper">
        {getSortedData().map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
