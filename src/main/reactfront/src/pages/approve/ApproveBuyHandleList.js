import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ApproveHandleTable from "./ApproveHandleTable";
import { BsArrowClockwise } from "react-icons/bs";
import Pagenation from "../../component/Pagenation";
import { useNavigate } from "react-router-dom";
import base64 from "base-64";
import { AiTwotonePrinter } from "react-icons/ai";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import ExcelDownload from "../../component/ExcelDownload";

function Approve() {
  // 관리자 사용 신청 내역 조회 페이지
  const { userRole } = useContext(tokenInfoContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (userRole !== "ROLE_ADMIN") {
      if (userRole === "ROLE_USER") {
        navigate("/user/userMain");
      } else if (userRole === "ROLE_ADMIN") {
        navigate("/admin/adminMain");
      } else if (userRole === "ROLE_HIGH_ADMIN") {
        navigate("/highadmin/highAdminMain");
      } else if (userRole === "none") {
        navigate("/");
      }
    }
  }, []);
  const token = localStorage.getItem("token");

  const [userRequest, setUserRequest] = useState([]); // 유저 리스트
  const [msg, setMsg] = useState(); // 리랜더링을 위해 useState 생성해서 응답 메시지 넣기
  const [inputText, setInputText] = useState(); // 검색창 value 값 state로 관리
  const [innerData, setInnerDate] = useState({
    // 승인, 반려 버튼 눌렀을 때 해당 행의 값 state로 관리
    userqNUM: "",
    userqKIND: "",
    userqCOUNT: "",
    username: "",
    userqTITLE: "",
    userqCOMMENT: "",
    userqOKDATE: "",
    userqGRANTOR: "",
    userqYN: "",
    categoryNUM: "",
  });
  const [inputInnerData, setInputInnerDate] = useState({
    // 검색 시 list 관리를 위한 state
    userqNUM: "",
    userqKIND: "",
    userqCOUNT: "",
    username: "",
    userqTITLE: "",
    userqCOMMENT: "",
    userqOKDATE: "",
    userqGRANTOR: "",
    userqYN: "",
    categoryNUM: "",
  });
  const handleToggle = (e) => {
    // 승인 모달창 핸들러
    let basicModal = document.getElementById("basicModal");
    basicModal.classList.toggle("show");
    basicModal.style.display =
      basicModal.style.display !== "none" ? "none" : "block";
    setInnerDate({
      ...innerData,
      userqKIND: e.target.closest(".prod-box").querySelector(".userq_KIND")
        .textContent,
      userqCOUNT: e.target.closest(".prod-box").querySelector(".userq_COUNT")
        .textContent,
      username: e.target.closest(".prod-box").querySelector(".user_name")
        .textContent,
      userqTITLE: e.target.closest(".prod-box").querySelector(".userq_TITLE")
        .textContent,
      userqCOMMENT: e.target
        .closest(".prod-box")
        .querySelector(".userq_COMMENT").textContent,
      userqNUM: e.target.closest(".prod-box").querySelector(".userq_NUM")
        .textContent,
      userqOKDATE: e.target.closest(".prod-box").querySelector(".userq_OKDATE")
        .textContent,
      userqGRANTOR: e.target
        .closest(".prod-box")
        .querySelector(".userq_GRANTOR").textContent,
      userqYN: e.target.closest(".prod-box").querySelector(".userq_YN")
        .textContent,
      categoryNUM: e.target.closest(".prod-box").querySelector(".category_NUM")
        .textContent,
    });
  };
  const handleClose = () => {
    // 승인 모달창 닫는 핸들러
    let basicModal = document.getElementById("basicModal");
    basicModal.style.display = "none";
    basicModal.classList.toggle("show");
  };
  const activeEnter = (e) => {
    // Enter 눌렀을 때 axios 함수 호출
    if (e.key === "Enter") {
      SearchForm(inputText);
    }
  };
  const SearchForm = (inputText) => {
    // 검색 기능
    let pageNav = document
      .getElementById("pills-tab")
      .querySelector(".active").textContent;
    axios({
      url: "/admin/UserRequestBuyHandleSearch",
      method: "post",
      data: {
        inputText: inputText,
        pageNav: "관리자" + pageNav,
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          alert("일치하는 내역이 없습니다.");
          resetBtn();
        } else {
          setInputInnerDate(response.data);
        }
      })
      .catch((error) => {
        alert("검색에 실패하였습니다.");
      });
  };

  const resetBtn = () => {
    // 검색 초기화 버튼
    let searchInput = document.getElementById("search-input");
    let assets_select = document.getElementById("assets-select");
    setInputInnerDate([]);
    searchInput.value = ""; // 검색 내용 비우기
    assets_select.value = 0;

    let allNav = document.getElementById("pills-home-tab"); // 전체 버튼
    let ulTag = document.querySelector(".page-nav");
    let liTag = ulTag.querySelectorAll(".nav-item");
    let activeClass = null;

    liTag.forEach((li) => {
      if (li.querySelector(".nav-link").classList.contains("active")) {
        activeClass = li;
      }
    });
    activeClass.querySelector("button").classList.remove("active"); // 기존 포커스 버튼 active class remove
    allNav.classList.add("active");
  };

  const kindBtn = (e) => {
    // 종류 버튼 (전체, 승인, 반려)
    let searchInput = document.getElementById("search-input");
    searchInput.value = ""; // 검색 내용 비우기

    let navText = e.target.innerText;

    axios({
      url: "/admin/UserRequestBuyNavSearch",
      method: "post",
      data: {
        navText: "관리자" + navText,
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setInputInnerDate(response.data);
        if (response.data.length === 0) {
          alert("검색된 데이터가 없습니다.");
        }
      })
      .catch((error) => {
        alert("검색에 실패하였습니다.");
      });
  };
  //////////////////////////////////////////////// page
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  // const handleSelectorChange = (event) => {
  //   setItemPerPage(Number(event.target.value));
  // };
  const totalPages = Math.ceil(userRequest.length / itemsPerPage); // 총 버튼 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹
  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  const assetsSelect = (e) => {
    // 자산별 조회 select
    if (e.target.value !== "0") {
      let ulTag = document.querySelector(".page-nav");
      let liTag = ulTag.querySelectorAll(".nav-item");
      let activeClass = null;
      liTag.forEach((li) => {
        if (li.querySelector(".nav-link").classList.contains("active")) {
          activeClass = li;
        }
      });

      axios({
        url: "/admin/UserRequestBuyCategorySearch",
        method: "post",
        data: {
          category_num: e.target.value,
          navText: activeClass.textContent,
        },
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.data.length === 0) {
            alert("검색된 데이터가 없습니다.");
            resetBtn();
          }
          setInputInnerDate(response.data);
        })
        .catch((error) => {
          alert("검색에 실패하였습니다.");
        });
    } else {
      setInputInnerDate([]);
    }
  };

  useEffect(() => {
    // 랜더링
    const token = localStorage.getItem("token");
    let payload = token.substring(
      token.indexOf(".") + 1,
      token.lastIndexOf(".")
    );
    let dec = JSON.parse(base64.decode(payload));
    let role = dec.role;
    if (role !== "ROLE_ADMIN" && role !== "ROLE_HIGH_ADMIN") {
      alert("접근 권한이 없습니다.");
      window.history.back();
    }

    if (inputInnerData.username === "" || inputInnerData.length === 0) {
      axios({
        url: "/admin/UserRequestBuyHandlePage",
        method: "get",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          setUserRequest(res.data);
        })
        .catch((error) => {
          alert("데이터 조회에 실패하였습니다.");
        });
    } else {
      setUserRequest(inputInnerData);
    }
  }, [msg, inputInnerData]);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>자산 구매 처리내역 조회</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Data</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <h5 className="card-title">자산 구매 처리내역 조회</h5>
                    </div>
                    <div className="col-6 text-right">
                      <div className="print-control react-icon">
                        <AiTwotonePrinter
                          onClick={() => window.print()}
                          title="프린트"
                        />
                      </div>
                      <div className="excel-control react-icon">
                        <ExcelDownload page={""} />
                      </div>
                    </div>
                  </div>

                  <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                    <div className="datatable-top">
                      <div className="datatable-dropdown">
                        <ul
                          className="nav nav-pills mb-3 page-nav"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li
                            className="nav-item page-nav-li"
                            role="presentation"
                          >
                            <button
                              className="nav-link active"
                              id="pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                              onClick={kindBtn}
                            >
                              전체
                            </button>
                          </li>
                          <li
                            className="nav-item page-nav-li"
                            role="presentation"
                          >
                            <button
                              className="nav-link"
                              id="pills-profile-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="pills-profile"
                              aria-selected="false"
                              onClick={kindBtn}
                            >
                              승인
                            </button>
                          </li>
                          <li
                            className="nav-item page-nav-li"
                            role="presentation"
                          >
                            <button
                              className="nav-link"
                              id="pills-contact-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-contact"
                              type="button"
                              role="tab"
                              aria-controls="pills-contact"
                              aria-selected="false"
                              onClick={kindBtn}
                            >
                              반려
                            </button>
                          </li>
                        </ul>
                        <div className="datatable-top">
                          <div className="datatable-dropdown assetsDrop">
                            <label htmlFor="">
                              <select
                                className="datatable-selector"
                                id="assets-select"
                                onChange={assetsSelect}
                              >
                                <option value="0">자산별 조회</option>
                                <option value="1">PC</option>
                                <option value="2">소프트웨어</option>
                                <option value="3">주변기기</option>
                                <option value="4">서버</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="datatable-search">
                        <button
                          type="button"
                          className="btn btn-primary reset-btn"
                        >
                          <BsArrowClockwise
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "gray",
                            }}
                            onClick={resetBtn}
                          />
                        </button>

                        <input
                          className="datatable-input"
                          placeholder="검색"
                          type="search"
                          title="Search within table"
                          id="search-input"
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={(e) => activeEnter(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            번호
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            신청자
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            자산명
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            수량
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            처리날짜
                          </a>
                        </th>

                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            처리상태
                          </a>
                        </th>

                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            처리자
                          </a>
                        </th>

                        <th data-sortable="true" className="handle">
                          <a href="#" className="datatable-sorter">
                            조회
                          </a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 테이블리스트 */}

                      {userRequest
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((item, index) => (
                          <ApproveHandleTable
                            key={index}
                            {...item}
                            index={index}
                            func={handleToggle}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          startPage={startPage}
          endPage={endPage}
          handleClick={handleClick}
        />
      </main>

      {/* 승인 모달창 */}
      <div
        className="modal fade"
        id="basicModal"
        tabIndex="-1"
        style={{ display: "none" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">처리 상태 확인</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>

            <form action="#" name="ApproveForm">
              <div className="modal-body">
                <p>처리상태 : {innerData.userqYN}</p>
                <hr />
                <p>신청자명 : {innerData.username}</p>
                <p>자산명 : {innerData.userqKIND}</p>
                <p>수량 : {innerData.userqCOUNT}개</p>
                <p>카테고리 번호 : {innerData.categoryNUM}번</p>
                <p>처리 날짜 : {innerData.userqOKDATE}</p>
                <p>처리 담당자 : {innerData.userqGRANTOR}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Approve;
