import "../../styles/Style.css";
import NoticeListTable from "./NoticeListTable";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { logDOM } from "@testing-library/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../styles/NoticeList.css"
import Pagenation from "../../component/Pagenation";
import { BsArrowClockwise } from "react-icons/bs";
import {NoticeOptionList} from "../../constants/OptionList"
import ControlMenu from "../../component/ControlMenu";
 
function NoticeList() {
  
  const token = localStorage.getItem("token");

  // 공지사항 목록 저장 하는 STATE
  const [noticeList, setNoticeList] = useState([]);

  // 선택한 공지사항의 state를 저장
  const [noticeData, setNoticeData] = useState({
    notice_regdate: "",
    notice_title: "",
    notice_name: "",
    notice_enddate: "",
    notice_content: "",
    notice_hits: "",
    notice_num: "",
  });
  
  const [searchText, setSearchText] = useState({
    notice_regdate: "",
    notice_title: "",
    notice_name: "",
    notice_enddate: "",
    notice_content: "",
    notice_hits: "",
    notice_num: "",
  });



  
  // 각 검색어 필드에 대한 핸들러 함수
  const handleSearchInputChange = (fieldName, value) => {
    setSearchText((prevSearchText) => ({
      ...prevSearchText,
      [fieldName]: value,
    }));
  };
  
  const handleSearch = () => {

    // 검색어를 서버로 보내고 검색 결과를 받아옴
    axios({
      url: "/noticelist/searchTitle", // 검색을 처리할 서버 엔드포인트
      method: "get",
      headers: {
        'Content-Type' : 'application/json;charset=utf-8',
        Authorization : token
      },
      params: searchText
    })
    
      .then((response) => {
        // 검색 결과를 처리
        console.log(response.data);
        setNoticeList(response.data);
      })
      .catch((error) => {
        alert("에러 발생: " + error);
       
      });
  };

  const handleSearchAll = () => {

    // 검색어를 서버로 보내고 검색 결과를 받아옴
    axios({
      url: "/noticelist", // 검색을 처리할 서버 엔드포인트
      method: "get",
      headers: {
        'Content-Type' : 'application/json;charset=utf-8',
        Authorization : token
      }
    })
      .then((response) => {
        // 검색 결과를 처리
        console.log(response.data);
        setNoticeList(response.data);
        // 페이지를 1페이지로 설정
        setCurrentPage(1);
      })
      .catch((error) => {
        alert("에러 발생: " + error);
       
      });
  };


  const handleSearchActive = () => {

    // 검색어를 서버로 보내고 검색 결과를 받아옴
    axios({
      url: "/noticelist/active", // 검색을 처리할 서버 엔드포인트
      method: "get",
      headers: {
        Authorization : token
      }
    })
      .then((response) => {
        // 검색 결과를 처리
        console.log(response.data);
        setNoticeList(response.data);
       // 페이지를 1페이지로 설정
       setCurrentPage(1);
      })
      .catch((error) => {
        alert("에러 발생: " + error);
       
      });
  };

  const handleSearchExpire = () => {

    // 검색어를 서버로 보내고 검색 결과를 받아옴
    axios({
      url: "/noticelist/expire", // 검색을 처리할 서버 엔드포인트
      method: "get",
      headers: {
        'Content-Type' : 'application/json;charset=utf-8',
        Authorization : token
      }
    })
      .then((response) => {
        // 검색 결과를 처리
        console.log(response.data);
        setNoticeList(response.data);
        // 페이지를 1페이지로 설정
        setCurrentPage(1);
      })
      .catch((error) => {
        alert("에러 발생: " + error);
       
      });
  };


  const handleSearchDate = () => {
    const searchStartDate = document.getElementById("searchStartDate");
    const searchEndDate = document.getElementById("searchEndDate");
  
    const startDate = searchStartDate.value;
    const endDate = searchEndDate.value;
  
    console.log(startDate);
    console.log(endDate);
  
    // 시작일과 종료일 중 적어도 하나가 비어 있는 경우
    if (!startDate || !endDate) {
      alert('등록일과 만료일을 모두 설정해주세요.');
      return; // 검색을 중지하고 알림만 표시
    }
  
    const data = {
      notice_regdate: startDate,
      notice_enddate: endDate,
    }
    

    axios({
      url: "/noticelist/searchDate", // 검색을 처리할 서버 엔드포인트
      method: "post",
      headers: {
        'Content-Type' : 'application/json;charset=utf-8',
        Authorization : token
      },
      data: data
    }).then((response) => {
      // 검색 결과를 처리
      console.log(response.data);
      setNoticeList(response.data);
    })
    .catch((error) => {
      alert("에러 발생: " + error);
     
    });
};

  const handleBackToggle = () => {
    let basicModalBack = document.getElementById("basicModalBack");
    basicModalBack.classList.toggle("show");
    basicModalBack.style.display =
      basicModalBack.style.display !== "none" ? "none" : "block";
  };

  const handleBackClose = () => {
    let basicModalBack = document.getElementById("basicModalBack");
    basicModalBack.style.display = "none";
    basicModalBack.classList.toggle("show");
  };

  const getList = () => {
    axios({
      url: "/noticelist",
      method: "get",
      headers: {
        Authorization : token
      }
    })
      .then((response) => {
        console.log(response)
        setNoticeList(response.data);
      })
      .catch((error) => {
        alert("에러발생" + error);
      });
  }


  useLayoutEffect(() => {
      getList();
  }, []);

  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (event) => {
    setItemPerPage(Number(event.target.value));
  };
  
  const totalPages = Math.ceil(noticeList.length / itemsPerPage);
  /* 페이지네이션 */
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  /* const totalPages = Math.ceil(data.length / itemsPerPage); */
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹

  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages); // 끝 페이지

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetBtn = () => {
    setSearchText({
      notice_regdate: "",
      notice_title: "",
      notice_name: "",
      notice_enddate: "",
      notice_content: "",
      notice_hits: "",
      notice_num: "",
    });
  
    // 날짜 입력 필드 초기화
    const searchStartDate = document.getElementById("searchStartDate");
    const searchEndDate = document.getElementById("searchEndDate");
  
    if (searchStartDate && searchEndDate) {
      searchStartDate.value = "";
      searchEndDate.value = "";
    }
  
    // 페이지를 다시 로드 (원상태로 돌아감)
    getList();
  };

  const getProcessedOption = () => {
    const copyOptionList = JSON.parse(JSON.stringify(NoticeOptionList));

    return copyOptionList.filter(
      (it) =>
        it.value !== "click"
    );
  };


// 1. 정렬을 위한 state
const [sortType, setSortType] = useState("number"); // 정렬 컬럼 state
const [checkClass, setCheckClass] = useState(false); // 내림, 오름 차순 선택 state

// 2. 각 정렬 선택에 따른 데이터 정렬 함수
const getProcessedList = () => {
  // 기존 리스트는 수정하지 않기 위해서 깊은 복사
  const copyList = JSON.parse(JSON.stringify(noticeList));

  // 각 선택된 링크에 대한 비교함수
  const compare = (a, b) => {
    // 선택된 컬럼에 대해서 case 별로 분류
    switch (sortType) {
      case "number": {
        // 번호 : 숫자 비교 => 문자열 일 수도 있으니 parseInt 로 감싼다
        if (checkClass) {
          return parseInt(b.index) - parseInt(a.index); // 오름차순
        } else {
          return parseInt(a.index) - parseInt(b.index); // 내림차순
        }
      }
      case "regdate": {
        const a_date = new Date(a.notice_regdate).getTime();
        const b_date = new Date(b.notice_regdate).getTime();

        if (checkClass) {
          return b_date - a_date;
        } else {
          return a_date - b_date;
        }
      }
      case "title": {
        if (checkClass) {
          return b.notice_title.localeCompare(a.notice_title);
        } else {
          return a.notice_title.localeCompare(b.notice_title);
        }
      }
      case "enddate": {
        const a_date = new Date(a.notice_enddate).getTime();
        const b_date = new Date(b.notice_enddate).getTime();

        if (checkClass) {
          return b_date - a_date;
        } else {
          return a_date - b_date;
        }
      }
      default: {
        return null;
      }
    }
  };

  // 비교함수에따라 정렬
  const sortedList = copyList.sort(compare);
  return sortedList;
};

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>공지사항</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">

              Home
              </li>
              <li className="breadcrumb-item active">Notice</li>
          
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">공지사항</h5>
                  <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                    <div className="datatable-top">
                      <div className="datatable-dropdown"></div>

                      <div className="tag-element tag-element--faq">
                        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleSearchAll}>전체</button>
                        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleSearchActive}>진행중</button>
                        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleSearchExpire}>만료</button>
                      </div>

                      <div className="col-sm-2">
                        <input type="date" 
                        id="searchStartDate"
                        className="form-control"                  
                        />
                      </div>

                      <span className="cal-line">-</span>
                    
                    
                      <div className="col-sm-2">
                        <input type="date" 
                        id="searchEndDate"
                        className="form-control"
                        />
                      </div>
                    
                      <div className="col-sm-2" >
                      <button className="btn btn-primary searchBtn" style={{marginLeft:"10px"}} type="button" onClick={handleSearchDate} >
                      검색 
                      </button>
                      </div>
                  

                      <div className="datatable-search">
                      <button type="button" className="btn btn-primary reset-btn"style={{ marginBottom: "5px" }}><BsArrowClockwise style={{width : "30px", height : "30px", color : "gray"}}
                                                                                                        onClick={resetBtn}/></button>
                        <input
                          type="search"
                          value={searchText.notice_title}
                          onChange={(e) => handleSearchInputChange("notice_title", e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSearch();
                            }
                          }}
                          placeholder="검색"
                        />
                      </div>
                    </div>
                  </div>
                  <table className="table datatable">
                    <thead className="noticeList_thead">
                      <tr>
                        {getProcessedOption().map((it, idx) => (
                        <ControlMenu
                          key={idx}
                          {...it}
                          checkClass={checkClass}
                          sortType={sortType}
                          setSortType={setSortType}
                          setCheckClass={setCheckClass}
                        />
                      ))}
                      </tr>
                    </thead>

                    <tbody>
                      {getProcessedList().slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      ).map((item, index) => (
                        <NoticeListTable
                          key={index}
                          {...item}
                          index={(currentPage - 1) * itemsPerPage + index} 
                          setNoticeData={setNoticeData}
                          getList={getList}
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                        />
                      ))}
                      {/* {noticeList.map((notice) => (
                        <tr key={notice.id}>
                          <th scope="row">{notice.id}</th>
                          <td>{notice.createDate}</td>
                          <td>{notice.status}</td>
                          <td>
                            <Link to={`/NoticeDetail/${notice.id}`}>
                              {notice.title}
                            </Link>
                          </td>
                          <td>{notice.author}</td>
                          <td>{notice.expirationDate}</td>
                          <td>{notice.views}</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {" "}
            {/* 글작성 버튼을 Link 컴포넌트로 수정 */}
            <Link to="/NoticeWrite" className="btn btn-primary writeBtn">
              글작성
            </Link>
          </div>
        </section>
        
      </main>
      <Pagenation
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        handleClick={handleClick}
      />
      <div
        className="modal fade"
        id="basicModalBack"
        tabIndex="-1"
        style={{ display: "none" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">삭제 확인</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleBackClose}
              ></button>
            </div>
            <div className="modal-body">해당 게시글을 삭제하시겠습니까?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleBackClose}
              >
                취소
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleBackClose}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
    
  );
}

export default NoticeList;