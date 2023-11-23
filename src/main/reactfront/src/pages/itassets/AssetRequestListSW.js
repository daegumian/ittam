import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import AssetAllListTable from './AssetAllListTable';
import {Link, useParams, useLocation} from 'react-router-dom';
import AssetRequestListSWTable from "./AssetRequestListSWTable";
import Pagenation from "../../component/Pagenation";
import AssetDetailModal from "./AssetDetailModal";
import {AssetAllListOption, AssetETCOption} from "../../constants/OptionList";
import ControlMenu from "../../component/ControlMenu";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {BsArrowClockwise} from "react-icons/bs";
import ExcelDownload from "../../component/ExcelDownload";
import { AiTwotonePrinter } from "react-icons/ai";

const validAssetNames = [ // 유효한 자산명 목록
  'PC', '소프트웨어', '주변기기', '서버', '데스크탑', '노트북', 'Microsoft Office', '파워포인트', '엑셀',
  '워드', '한글과컴퓨터', '인텔리제이', '키보드', '마우스', '복합기', '프린터', '스캐너', '서버용하드',
];

const AssetRequestListSW = () => {
  const { userRole,username} = useContext(tokenInfoContext);
  const token = localStorage.getItem("token");
  const [AssetRequest, setAssetRequest] = useState([]); // 전체 자산 리스트
  const [inputText, setInputText] = useState('');

  const [inputInnerData, setInputInnerDate] = useState({ // 검색 시 list 관리를 위한 state
    assets_name : "", assets_status : "", spec_mfg : "", spec_seriel : "", spec_warranty : "",
    category_name : "", spec_num : "", assets_num : "", assets_detail_name : "",
    //
    sw_mfg: '', sw_spec_seriel: '', sw_spec_warranty: '', sw_purchase_date: '', sw_price: '',
    /* etcspec */
    etc_mfg: '', etc_spec_warranty: '', etc_purchase_date: '', etc_price: '',
    /* pcspec */
    spec_cpu: '', spec_ram: '', spec_mainboard: '', spec_power: '', spec_gpu: '', spec_hdd: '', spec_ssd: '', spec_ops: '',
    // spec_mfg: '',
    // spec_seriel: '',
    spec_purchase_date: '',
    /* serverspec */
    server_mfg: '', server_spec_warranty: '', server_capa: '', server_price: '', server_purchase_date: '', server_interface: '', server_average_life: '', server_rpm: '', server_datarecovery_life: '',
    /* 승인요청 */
    username: '', appro_title: '', appro_comment: '', category_num:''
  });

  const url = useLocation();
  const path = url.pathname;


  // 검색
  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      searchAssets(inputText);
    }
  };
  const searchAssets = (inputText) => {
    axios({
      url: '/AssetRequest/AssetRequestSearchSW',
      method: 'post',
      data: {
        inputText: inputText
      },
      headers: {
        Authorization : token
      },
    })
        .then((response) => {
          setInputInnerDate(response.data);
          if (response.data.length === 0) { // response.data가 빈 배열인 경우
            window.alert("일치하는 자산이 없습니다");}
        })
        .catch((error) => {
          alert('검색에 실패하였습니다.');
        });
  };

  //자산 목록 조회
  useEffect(() => {
    if (inputInnerData.assets_name === "" || inputInnerData.length === 0) {
      // Axios를 사용하여 서버로 데이터를 보냅니다.
      axios.get(`/AssetRequest/AssetRequestListCategory?path=${encodeURIComponent(path)}`,{
        headers: {
          Authorization : token
        },
      })
          .then((res) => setAssetRequest(res.data))
          .catch((error) => {
            console.error('요청 실패:', error);
          });
    } else {
      setAssetRequest(inputInnerData);
    }
  }, [inputInnerData, path]);

  // 구매버튼 스타일
  const buttonStyle = {
    marginLeft: '10px',
    marginRight: '40px',
  };

  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (e) => {
    setItemPerPage(Number(e.target.value));
    console.log(Number(e.target.value))
  };

  /* 페이지네이션 */
  const totalPages = Math.ceil(AssetRequest.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹

  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages); // 끝 페이지

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 신청 날짜
  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();
    return todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + dayOfWeek + " ";
  }
  //상세페이지
  const [selectedItem, setSelectedItem] = useState(null);
  const handleModal = (item) => {
    setSelectedItem(item);
  };
  //사용 신청 모달창
  const handleToggle = (e) => { // 승인 모달창 핸들러
    const username = localStorage.getItem('username');
    let basicModal = document.getElementById("basicModal");
    basicModal.classList.toggle("show");
    basicModal.style.display = ((basicModal.style.display !== 'none') ? 'none' : 'block');
    setInnerDate({
      ...innerData,
      username: username,
      assets_name: e.target.closest(".prod-box").querySelector(".assets_name").textContent,
      category_num: e.target.closest(".prod-box").querySelector(".category_num").textContent,
      assets_num: e.target.closest(".prod-box").querySelector(".assets_num").textContent,
    });
    // 모달 센터로 이동
    const modal = document.querySelector(".modalmodal .card");
    modal.style.left = `calc(50% - ${modal.clientWidth / 2}px)`;
    modal.style.top = `calc(50% - ${modal.clientHeight / 2}px)`;
  };
  // 사용신청 모달창 닫는 핸들러
  const handleClose = async () => {
    let basicModal = document.getElementById("basicModal");
    basicModal.style.display = "none";
    basicModal.classList.toggle("show");
    setInnerDate({
      assets_name: "",
      category_num: "",
      assets_num: "",
      userq_title: "",
      userq_comment: "",
      username: ""
    });

    try {
      // 자산 목록을 다시 불러오는 함수 호출
      const response = await axios.get(`/AssetRequest/AssetRequestListCategory?path=${encodeURIComponent(path)}`, {
        headers: {
          Authorization: token,
        },
      });
      if (inputInnerData.assets_name === "" || inputInnerData.length === 0) {
        setAssetRequest(response.data);
      } else {
        setAssetRequest(inputInnerData);
      }
    } catch (error) {
      console.error("전체 자산 목록을 불러오는 데 실패하였습니다.", error);
      alert("전체 자산 목록을 불러오는 데 실패하였습니다.");
    }
  };
  // 사용신청 버튼 눌렀을 때 해당 행의 값 state로 관리
  const [innerData, setInnerDate] = useState({
    username:username || '', assets_name : "", category_num : "", assets_num : "",
    userq_title :"", userq_comment : "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInnerDate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 사용신청 폼
  const AssetUsageRequestForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/AssetRequest/AssetUsageRequest', innerData, {
        headers: {
          Authorization : token
        },
      });
      if (response.data) {
        setInnerDate({
          //초기화
          assets_name: "", category_num: "", assets_num: "", userq_title: "", userq_comment: "",
        });
        handleClose();
        alert("정상적으로 사용 신청이 처리되었습니다.");
      }
    } catch (error) {
      console.error("사용 신청 처리에 실패하였습니다.", error);
      alert("사용 신청 처리에 실패하였습니다.");
      setInnerDate({
        //초기화
        assets_name: "", category_num: "", assets_num: "", userq_title: "", userq_comment: "",
      });
    }
  };
  // 구매 사용 신청
  const handleToggleBuy = (e) => { // 구매신청 모달창 핸들러
    let basicModal = document.getElementById("basicModalBuy");
    basicModal.classList.toggle("show");
    basicModal.style.display = ((basicModal.style.display !== 'none') ? 'none' : 'block');

    // 모달 센터로 이동
    const modal2 = document.querySelector(".modalmodal2 .card");
    modal2.style.left = `calc(50% - ${modal2.clientWidth / 2}px)`;
    modal2.style.top = `calc(50% - ${modal2.clientHeight / 2}px)`;

    setInnerBuyDate({
      ...innerBuyData
    });

  }
  const [innerBuyData, setInnerBuyDate] = useState({ // 승인, 반려 버튼 눌렀을 때 해당 행의 값 state로 관리
    username:username || '', assets_name : "", userq_title :"", userq_comment : "",
  });
  const handleBuyClose = () =>  { // 구매신청 모달창 닫는
    let basicModalBuy = document.getElementById("basicModalBuy");
    basicModalBuy.style.display = "none";
    basicModalBuy.classList.toggle("show");
    setInnerBuyDate({
      //초기화
      assets_name: "", userq_title: "", userq_comment: "",
    });
  };
  const handleBuyChange = (e) => {
    const { name, value } = e.target;
    setInnerBuyDate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const AssetBuyRequestForm = async (e) => {
    e.preventDefault();

    if (!validAssetNames.includes(innerBuyData.assets_name)) {
      // 유효한 자산명이 아닌 경우
      alert('유효한 자산명을 입력하세요: ' + validAssetNames.join(', '));
      return;
    }

    try {
      const response = await axios.post('/AssetRequest/AssetBuyRequest', innerBuyData,{
        headers: {
          Authorization : token
        },
      });
      //초기화
      if (response.data) {
        setInnerBuyDate({
          assets_name: "", userq_title: "", userq_comment: "",
        });
        handleBuyClose()
        alert("정상적으로 구매 신청이 처리되었습니다.");
      }
    } catch (error) {
      console.error("구매 신청 처리에 실패하였습니다.", error);
      alert("구매 신청 처리에 실패하였습니다.");
      setInnerBuyDate({
        assets_name: "", userq_title: "", userq_comment: "",
      });
    }
  };

  // 1. 정렬을 위한 state
  const [sortType, setSortType] = useState("number"); // 정렬 컬럼 state
  const [checkClass, setCheckClass] = useState(false); // 내림, 오름 차순 선택 state

  // 2. 각 정렬 선택에 따른 데이터 정렬 함수
  const getProcessedList = () => {
    // 기존 리스트는 수정하지 않기 위해서 깊은 복사
    const copyList = JSON.parse(JSON.stringify(AssetRequest));

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
        case "name": {
          if (checkClass) {
            return b.assets_name.localeCompare(a.assets_name);
          } else {
            return a.assets_name.localeCompare(b.assets_name);
          }
        }
        case "status": {
          if (checkClass) {
            return b.assets_status.localeCompare(a.assets_status);
          } else {
            return a.assets_status.localeCompare(b.assets_status);
          }
        }
        case "mfg": {
          if (checkClass) {
            return b.sw_mfg.localeCompare(a.sw_mfg);
          } else {
            return a.sw_mfg.localeCompare(b.sw_mfg);
          }
        }
        case "seriel": {
          // 권한
          if (checkClass) {
            return b.sw_spec_seriel.localeCompare(a.sw_spec_seriel);
          } else {
            return a.sw_spec_seriel.localeCompare(b.sw_spec_seriel);
          }
        }
        case "war": {
          if (checkClass) {
            return b.sw_spec_warranty.localeCompare(a.sw_spec_warranty);
          } else {
            return a.sw_spec_warranty.localeCompare(b.sw_spec_warranty);
          }
        }
        case "category": {

          if (checkClass) {
            return b.category_name.localeCompare(a.category_name);
          } else {
            return a.category_name.localeCompare(b.category_name);
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

  //리셋 버튼
  const resetBtn = () => {
    let searchInput = document.getElementById("search-input");
    setInputInnerDate([]);
    searchInput.value = "";
  };

  //페이징 리셋
  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleSelectChange2 = (e) => {
    const value = e.target.value;
    if (value === "0") {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(value);
    }
    setCurrentPage(1);
  };

  const lastItemIndex = pagesPerGroup * totalPages;

  return (
      <div>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>IT자산 목록</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="index.html">Home</Link>
                </li>
                <li className="breadcrumb-item">Assets</li>
                <li className="breadcrumb-item active">Software</li>
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
                        <h5 className="card-title">소프트웨어</h5>
                      </div>
                      <div className="col-6 text-right">
                        <div className="print-control react-icon">
                           <AiTwotonePrinter onClick={() => window.print()}
                           title="프린트"/>
                        </div>
                        <div className="excel-control react-icon">
                          <ExcelDownload page={"softwareList"} />
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
                                onChange={(e) => {
                                  handleSelectorChange(e); // 첫 번째 함수 호출
                                  handleSelectChange2(e)
                                }}
                                style={{ marginLeft: "20px", borderColor: "lightgray" }}

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
                          <button className="btn btn-primary assetBuytBtn"
                                  // type="button" style={{marginRight:"1025px", marginBottom:"10px"}}
                                  type="button" style={{marginRight:"7px"}}
                                  data-bs-formtarget="#basicModal"
                                  onClick={handleToggleBuy} id="assetBuytBtn">+ 구매신청
                          </button>
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
                        <th data-sortable="true" className="ControlMenu">
                          <Link to="#"></Link>
                        </th>
                        {AssetETCOption.map((it, idx) => (
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

                      {/* 테이블 시작 */}

                      <tbody>
                      {getProcessedList().slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                      ).map((item, index) => (
                          <AssetRequestListSWTable
                              key={index}
                              {...item}
                              index={index}
                              func={handleToggle}
                              handleModal={handleModal}
                              currentPage={currentPage}
                              itemsPerPage={itemsPerPage}
                          />
                      ))}
                      </tbody>
                    </table>
                    {/* 상세정보 모달창 */}
                    <div
                        className="modal fade"
                        id="modalDialogScrollable"
                        tabIndex="-1"
                    >
                      <AssetDetailModal selectedItem={selectedItem} />
                    </div>
                    {/* 상세정모 모달창 끝*/}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 페이징네이션 */}

          <Pagenation
              currentPage={currentPage}
              totalPages={totalPages}
              startPage={startPage}
              endPage={endPage}
              handleClick={handleClick}
          />
        </main>

        {/* 사용신청 모달창 */}
        <div className="modal modalmodal" id="basicModal"  style={{display : "none"}} >
          <div className="card" style={{width: '600px', borderRadius: "8px"}} onClick={(e) => e.stopPropagation()}>
            <div className="card-body">
              <h5 className="card-title" style={{ paddingBottom: "0px" }}>자산 사용 신청</h5>
              <hr />
              <form method="post" name="AssetUsageRequestForm" onSubmit={(e) => AssetUsageRequestForm(e)}>

                <div className="modal-body">

                  <div className="row mb-3">
                    <label htmlFor="" className="col-sm-2 col-form-label">신청자산</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"
                             name="assets_name"
                             onChange={handleChange}
                             value={innerData.assets_name}
                             disabled
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">신청자</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="username" value={username || ''} disabled />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">신청날짜</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" value={todayTime()} disabled />
                    </div>
                  </div>
                  <div className="row mb-3 position-relative">
                    <label htmlFor="validationTooltip03" className="col-sm-2 col-form-label needs-validation" >신청제목</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="validationTooltip01"
                             required
                             name="userq_title"
                             onChange={handleChange}
                             value={innerData.userq_title}
                             placeholder={"제목"}
                      />
                      <div className="invalid-tooltip">
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">신청사유</label>
                    <div className="col-sm-10">
                      <textarea className="form-control userModalAst-text"
                                name="userq_comment"
                                onChange={handleChange}
                                value={innerData.userq_comment}
                                placeholder={"신청사유를 간략히 적어주세요"}
                                required></textarea>
                    </div>
                  </div>
                  <div className="row mb-3 userModalAsk-btn">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                      <button type="button" className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'gray', border: 'gray' }} onClick={handleClose}>뒤로가기</button>
                      <button type="submit" className="btn btn-primary">신청하기</button>

                    </div>
                  </div>
                </div>
              </form>{/* <!-- End General Form Elements --> */}
            </div>
          </div>
        </div>
        {/*사용 신청 모달 끝*/}

        {/* 구매 신청 모달창 */}
        <div className="modal modalmodal2" id="basicModalBuy"
             style={{display : "none"}} >
          <div className="card" style={{width: '600px', borderRadius: "8px"}} onClick={(e) => e.stopPropagation()}>
            <div className="card-body">

              <h5 className="card-title" style={{ paddingBottom: "0px" }}>자산 구매 신청</h5>
              <hr />

              <form method="post" name="AssetBuyRequestForm" onSubmit={(e) => AssetBuyRequestForm(e)}>

                <div className="modal-body">

                  <div className="row mb-3 position-relative">
                    <label htmlFor="validationTooltip03" className="col-sm-2 col-form-label needs-validation" >신청자산</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="validationTooltip01"
                             required
                             name="assets_name"
                             onChange={handleBuyChange}
                             value={innerBuyData.assets_name}
                      />
                      <div className="invalid-tooltip">
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">신청자</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="username" value={username || ''} disabled />

                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">신청날짜</label>
                    <div className="col-sm-10">
                      <input className="form-control" value={todayTime()} disabled />
                    </div>
                  </div>

                  <div className="row mb-3 position-relative">
                    <label htmlFor="validationTooltip03" className="col-sm-2 col-form-label needs-validation" >신청제목</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="validationTooltip01"
                             required
                             name="userq_title"
                             onChange={handleBuyChange}
                             value={innerBuyData.userq_title}
                             placeholder={"제목"}
                      />
                      <div className="invalid-tooltip">
                      </div>
                    </div>
                  </div>


                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">신청사유</label>
                    <div className="col-sm-10">
                      <textarea className="form-control userModalAst-text"
                                name="userq_comment"
                                onChange={handleBuyChange}
                                value={innerBuyData.userq_comment}
                                required
                                placeholder={"신청사유와 자산의 간략한 사양을 기입하세요"}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mb-3 userModalAsk-btn">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                      <button type="button" className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'gray', border: 'gray' }} onClick={handleBuyClose}>뒤로가기</button>
                      <button type="submit" className="btn btn-primary">신청하기</button>

                    </div>
                  </div>
                </div>
              </form>{/* <!-- End General Form Elements --> */}

            </div>
          </div>
        </div>
        {/*구매 신청 모달 끝*/}

      </div>
  );
};

export default AssetRequestListSW;
