import React, { useState } from "react";
import { Link } from "react-router-dom";

const ControlMenu = ({
  name, // 가져온 option의 name
  sortType,
  checkClass,
  value, // 가져온 option의 value
  setSortType,
  setCheckClass,
}) => {
  // 클래스에 선택된 정렬타입이 있느냐 없느냐를 확인하는 state
  const [className, setClassName] = useState("datatable-sorter");

  const handleLinkClick = (event) => {
    const selectedType = event.target.getAttribute("data-value");

    // 다른 정렬을 선택하면 초기화
    // 현재 정렬 타입과 클릭한 링크의 값이 같다면 checkClass를 토글(값을 변경)
    if (sortType === selectedType) {
      setCheckClass(!checkClass);
    } else {
      // 다른 정렬 타입을 선택한 경우 checkClass를 false로 초기화
      setCheckClass(false);
    }

    // 클래스에 있는지 없는지를 나타내는 boolean타입 변수
    const classinclude = event.target.className.includes(selectedType);

    // classinclude 가 true 라면 클래스를 datatable-sorter로 false라면 datatable-sorter + selectedType으로
    setClassName(
      classinclude ? "datatable-sorter" : `datatable-sorter ${selectedType}`
    );
    setSortType(selectedType);
  };

  return (
    <th data-sortable="true" className="ControlMenu">
      <Link
        to="#"
        className={className}
        onClick={handleLinkClick}
        data-value={value}
      >
        {name}
      </Link>
    </th>
  );
};

export default React.memo(ControlMenu);
