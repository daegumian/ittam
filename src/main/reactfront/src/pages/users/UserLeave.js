import { useEffect, useContext, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowClockwise } from "react-icons/bs";
import axios from "axios";

import { UserStateContext } from "./Users";
import { tokenInfoContext } from "../../component/TokenInfoProvider";

import UserItem from "./UserItem";
import Pagenation from "../../component/Pagenation";
import { UserOptionList } from "../../constants/OptionList"; // 옵션들을 정의해둔 list에서 객체로 사용할 옵션을 가져온다
import ControlMenu from "../../component/ControlMenu";
import UserLeaveModal from "../../component/Modal/UserLeaveModal";
import { AiTwotonePrinter } from "react-icons/ai";
import ExcelDownload from "../../component/ExcelDownload";

const UserLeave = () => {
  const userList = useContext(UserStateContext);
  const token = localStorage.getItem("token");
  const { userRole } = useContext(tokenInfoContext);

  const filteredList = userList.filter((it) => it.user_leave_yn === "Y"); // 퇴사 신청한 리스트

  const navigate = useNavigate();
  const location = useLocation();

  // 권한 체크 및 경고 메시지 함수
  const checkUserRole = () => {
    if (userRole !== "ROLE_ADMIN" && userRole !== "ROLE_HIGH_ADMIN") {
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
  };

  // 검색
  const [inputText, setInputText] = useState(""); // 검색창 value
  const [searchOption, setSearchOption] = useState("all");
  const [searchResult, setSearchResult] = useState([]);

  const dataId = useRef(0); // 검색된 데이터에 추가하기 위한 ref

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // URL 쿼리 문자열 파싱
    const searchParam = queryParams.get("value") || "";
    const searchOptionParam = queryParams.get("option") || "all";

    setInputText(searchParam);
    setSearchOption(searchOptionParam);

    // 페이지 로딩 시 권한 체크
    checkUserRole();
  }, [location, userList]);

  // 검색 핸들링
  const handleSearchEnter = (event) => {
    if (event.key === "Enter") {
      // URL 업데이트
      const newValue = encodeURIComponent(inputText);
      const newOption = encodeURIComponent(searchOption);
      const url = `/users/userLeave?value=${newValue}&option=${newOption}`;
      // navigate로 url업데이트
      navigate(url);

      axios({
        url: `/user/userSearch?value=${newValue}&option=${newOption}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          const searchData = res.data
            .filter((it) => it.user_leave_yn === "Y")
            .map((it) => {
              dataId.current += 1;
              return {
                id: dataId.current,
                ...it,
              };
            });
          if (searchData.length < 1) {
            alert("검색결과가 없습니다");
            setInputText("");
            navigate("/user/userLeave");
          } else {
            setSearchResult(searchData); // 검색 결과 업데이트
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchResult([]);
    }
  };

  // 검색 결과를 렌더링할 데이터 선택
  const dataToRender = searchResult.length > 0 ? searchResult : filteredList;

  //// 모달
  const [modalStatus, setModalStatus] = useState(false); // 모달 핸들링 위한 state
  const [modalContent, setModalContent] = useState({
    username: "",
    user_name: "",
    user_email: "",
    user_depart: "",
    user_phone: "",
    role: "",
    user_leavedate: "",
  }); // 모달 콘텐츠

  // 모달 열기 전 state 설정
  const handleModalOpen = async (userId) => {
    if (userId) {
      getModalContent(userId);
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalStatus(false);
  };

  useEffect(() => {
    if (modalContent.username) {
      setModalStatus(true); // 모달 열기
    }
  }, [modalContent]);

  // 퇴사 신청 상세 콘텐츠
  const getModalContent = async (userId) => {
    if (userId) {
      axios({
        url: "/user/userDetail",
        method: "post",
        data: {
          userId: userId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          // 가져온 데이터를 state에 맵핑
          const userData = res.data;

          setModalContent({
            username: userData.username,
            user_name: userData.user_name,
            user_email: userData.user_email,
            user_depart: userData.user_depart,
            user_phone: userData.user_phone,
            role: userData.role,
            user_leavedate: userData.user_joindate,
          });
        })
        .catch((err) => alert("퇴사 상세정보를 가져오는데 실패했습니다"));
    }
  };
  //모달 끝

  // 옵션에 필터를 걸어서 필요한 것만
  const getProcessedOption = () => {
    const copyOptionList = JSON.parse(JSON.stringify(UserOptionList));

    return copyOptionList.filter(
      (it) => it.value !== "role" && it.value !== "date"
    );
  };

  // 1. 정렬을 위한 state
  const [sortType, setSortType] = useState("number"); // 정렬 컬럼 state
  const [checkClass, setCheckClass] = useState(false); // 내림, 오름 차순 선택 state

  // 2. 각 정렬 선택에 따른 데이터 정렬 함수
  const getProcessedList = () => {
    // 기존 리스트는 수정하지 않기 위해서 깊은 복사
    const copyList = JSON.parse(JSON.stringify(dataToRender));

    // 각 선택된 링크에 대한 비교함수
    const compare = (a, b) => {
      // 선택된 컬럼에 대해서 case 별로 분류
      switch (sortType) {
        case "number": {
          // 번호 : 숫자 비교 => 문자열 일 수도 있으니 parseInt 로 감싼다
          if (checkClass) {
            return parseInt(b.id) - parseInt(a.id); // 오름차순
          } else {
            return parseInt(a.id) - parseInt(b.id); // 내림차순
          }
        }
        case "name": {
          // 이름 : 문자열을 사전 순으로 비교한다
          if (checkClass) {
            return b.user_name.localeCompare(a.user_name);
          } else {
            return a.user_name.localeCompare(b.user_name);
          }
        }
        case "id": {
          // 사원번호 : 부서 빼고 번호만 비교
          const a_id = parseInt(a.username.slice(3, a.username.length));
          const b_id = parseInt(b.username.slice(3, b.username.length));

          if (checkClass) {
            return b_id - a_id;
          } else {
            return a_id - b_id;
          }
        }
        case "depart": {
          // 부서
          if (checkClass) {
            return b.user_depart.localeCompare(a.user_depart);
          } else {
            return a.user_depart.localeCompare(b.user_depart);
          }
        }
        case "email": {
          // 이메일
          if (checkClass) {
            return b.user_email.localeCompare(a.user_email);
          } else {
            return a.user_email.localeCompare(b.user_email);
          }
        }
        case "leaveDate": {
          // 입사일 : Date 를 비교해야 하므로 state의 날짜 문자열을 가지고 와서 새로운 Date 객체에 넣고 getTime()을 사용해 ms로 변환 후 비교
          const a_date = new Date(a.user_joindate).getTime();
          const b_date = new Date(b.user_joindate).getTime();

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

  // 리셋버튼
  const resetBtn = () => {
    // 검색 데이터 초기화
    setSearchResult([]);
    setInputText("");

    // 쿼리 파라미터를 제거하고 기존 주소로 이동
    navigate("/users/userLeave");
  };
  ////////////////////////

  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (event) => {
    setItemPerPage(parseInt(event.target.value));
  };

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
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

  return (
    <div className="UserLeave">
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h5 className="card-title">사용자 목록</h5>
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
                      <label htmlFor="">
                        <select
                          className="datatable-selector"
                          value={itemsPerPage}
                          onChange={handleSelectorChange}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </select>
                      </label>
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
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleSearchEnter}
                      />
                    </div>
                  </div>
                </div>

                <table className="table datatable">
                  <thead>
                    <tr>
                      {/* 리스트 헤드, 각 state와 변환함수를 넘긴다 */}
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
                    {getProcessedList()
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((it, idx) => (
                        <UserItem
                          key={idx}
                          {...it}
                          idx={idx}
                          onUserClick={handleModalOpen}
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                        />
                      ))}
                  </tbody>
                </table>
                <UserLeaveModal
                  closeModal={handleCloseModal}
                  modalContent={modalContent}
                />
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
    </div>
  );
};

export default UserLeave;
