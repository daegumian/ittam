import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const token = localStorage.getItem("token");

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표현하고 0으로 채움
  const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리로 표현하고 0으로 채움
  return `${year}-${month}-${day}`;
};



const NoticeListTable= ({
  index,
  notice_regdate,
  notice_title,
  notice_name,
  notice_enddate,
  notice_content,
  notice_hits,
  notice_num,
  setNoticeData,
  getList,currentPage, itemsPerPage,
}) => {
  const noticeElem = useRef()
  const navigate = useNavigate(); // navigate 함수 생성
  

const handleDelete = () => {
  if (window.confirm("정말로 삭제하시겠습니까?")) {
      // axios
      // .post(`http://localhost:9191/noticelist/delete`, {
      //   notice_num: notice_num,
      // })
      // .then((res) => {
      //   // alert(res.data);
      //   // //noticeElem.current.remove()
      //   // getList();
      // })
      // .catch((err) => {
      //   alert(err);
      // });

      axios({
        url: "http://localhost:9191/noticelist/delete",
        method: "post",
        headers: {
          Authorization : token
        },
        data: {
          notice_num: notice_num
        }
      })
      .then((res) => {
        // alert(res.data);
        // //noticeElem.current.remove()
        // getList();
      })
      .catch((err) => {
        alert(err);
      });

      // axios
      // .post(`http://localhost:9191/noticelist/deleteimg`,{
      //   notice_num2: notice_num,
      // })
      // .then((res) => {
      //   console.log(1);
      //   alert(res.data);
      //   getList();
      // })
      // .catch((err) => {
      //   alert(err);
      // });

      axios({
        url: "http://localhost:9191/noticelist/deleteimg",
        method: "post",
        headers: {
          Authorization : token
        },
        data: {
          notice_num2: notice_num
        }
      })
      .then((res) => {
        console.log(1);
        alert(res.data);
        getList();
      })
      .catch((err) => {
        alert(err);
      });
  }};

const handleClickEvent = () => {
    setNoticeData({
      notice_regdate: {notice_regdate},
      notice_title: { notice_title },
      notice_name: { notice_name },
      notice_enddate: { notice_enddate },
      notice_content: { notice_content },
      notice_hits: { notice_hits },
      notice_num: { notice_num },
    });

    navigate(`/NoticeDetail/${notice_num}`);
  };

  const EditClickEvent = () => {
    navigate(`/NoticeEdit`, {
      state: {
        notice_regdate,
        notice_title,
        notice_name,
        notice_enddate,
        notice_content,
        notice_hits,
        notice_num,
      },
    });
  };

  return (
    <Fragment>
      <tr className="prod-box NoticeListTable" ref={noticeElem}>
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
        <td className="notice_hits" style={{ display: "none" }}>
          {notice_hits}
        </td>
        <td className="notice_num" style={{ display: "none" }}>
          {notice_num}
        </td>
        <td>
          <button className="btn btn-primary writeBtn"
          type="button"
          onClick={EditClickEvent}
          >수정</button>
        </td>
        <td>
          <button
            className="btn btn-primary deleteBtn"
            type="button"
            data-bs-formtarget="#basicModal"
            onClick={handleDelete}
          >
            삭제
          </button>
        </td>
      </tr>
    </Fragment>
    
  );
  
};

export default NoticeListTable;
