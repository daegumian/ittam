import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표현하고 0으로 채움
  const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리로 표현하고 0으로 채움
  return `${year}-${month}-${day}`;
};

const NoticeUserTable = ({
  index,
  notice_regdate,
  notice_title,
  notice_name,
  notice_enddate,
  notice_content,
  notice_hits,
  notice_num,
  setNoticeData,currentPage, itemsPerPage,
}) => {
  const navigate = useNavigate(); // navigate 함수 생성

  const handleClickEvent = () => {
    setNoticeData({
      notice_regdate: notice_regdate,
      notice_title: notice_title,
      notice_name: notice_name,
      notice_enddate: notice_enddate,
      notice_content: notice_content,
      notice_hits: notice_hits,
      notice_num: notice_num,
    });

    navigate(`/NoticeDetail/${notice_num}`); // NoticeDetailUser로 이동
  };

  return (
    <Fragment>
      <tr className="prod-box NoticeListTable">
        <th scope="row" style={{ textAlign: 'center' }}>
          {/* {`${(currentPage - 1) * itemsPerPage + index + 1}`.padStart(4, '\u00A0')} */}
          {index + 1}
        </th>
        <td className="notice_regdate">{formatDate(notice_regdate)}</td>
        <td
          className="notice_title"
          onClick={handleClickEvent}>
          <p>{notice_title}</p>
        </td>
        <td className="notice_name">{notice_name}</td>
        <td className="notice_enddate">{formatDate(notice_enddate)}</td>
        <td className="notice_content" style={{ display: "none" }}>
          {notice_content}
        </td>
        <td className="notice_hits">
          {notice_hits}
        </td>
        <td className="notice_num" style={{ display: "none" }}>
          {notice_num}
        </td>
      </tr>
    </Fragment>
    
  );
  
};

export default NoticeUserTable;
