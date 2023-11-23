import "../../styles/Style.css";
import "../../styles/MainPageStyle/UserStyle.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReturnReqModal from "../../component/Modal/ReturnReqModal";
import ReturnCancelModal from "../../component/Modal/ReturnCancelModal";
import { Link, useNavigate } from "react-router-dom";
import Pagenation from "../../component/Pagenation";
import { AiTwotonePrinter } from "react-icons/ai";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import ExcelDownload from "../../component/ExcelDownload";

function UserMain_using() {
  const { userRole } = useContext(tokenInfoContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole !== "ROLE_USER") {
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

  const [openModal, setOpenModal] = useState(false);
  const [openCancelMddal, setOpenCancelModal] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [myAssetNum, setMyAssetNum] = useState(0);
  const [myAssetList, setMyAssetList] = useState([]);
  const [username, setUsername] = useState("");
  const [choiceCatogory, setChoiceCategory] = useState("all");
  const [openAlert, setOpenAlert] = useState(false);
  const [openCancelAlert, setOpenCancelAlert] = useState(false);
  const [myInfo, setMyInfo] = useState({});

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + dayOfWeek + " " +  hours + "시 " + minutes + "분";
  }

  const rentDate = (rent) => {
    let now = new Date(rent);
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "-" + (todayMonth >= 10 ? todayMonth : '0'+todayMonth) + "-" + (todayDate >= 10 ? todayDate : '0'+todayDate);
  }

  const getMyInfo = (username) => {
    axios({
      url: "/mainPage/getMyInfo",
      method: "get",
      headers: {
        Authorization : token
      },
      params: {
        username: username
      }
    })
        .then(response => {setMyInfo(response.data); console.log(response.data);})
        .catch(error => console.log(error))
  }


  const [data, setData] = useState({
    assets_num: "",
    username: username,
    return_kind: "교환",
    return_title: "",
    return_comment: "",
    return_date: "",
    return_status: ""
  });

  const handleChange = (e) => {

    if(e.target.name === 'return_title') {
      setInputTitle(e.target.value);

    } else if (e.target.name === 'return_comment') {
      setInputComment(e.target.value);
    }

    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };
  const handleSubmit = (e, assets_num) => {
    e.preventDefault();
    const returnForm = {
      assets_num: assets_num,
      username: username,
      return_kind: data.return_kind,
      return_title: inputTitle,
      return_comment: inputComment,
      return_date: data.return_date,
      return_status: data.return_status
    };
    console.log(returnForm);

    axios({
      url: "/mainPage/returnForm",
      method: "post",
      headers: {
        Authorization : token
      },
      data: returnForm
    })
        .then((response) => {
          alert('신청완료되었습니다.');
          console.log(response.data);

          setOpenModal(false);
          getMyAssetList(username);
          setOpenAlert(true);
          setOpenCancelAlert(false);

        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });


    setInputTitle('');
    setInputComment('');
  };

  const getMyAssetList = (username) => {

    axios({
      url: "/mainPage/getMyAssetList",
      method: "get",
      headers: {
        Authorization : token
      },
      params: {
        username: username
      }
    }).then(response => {setMyAssetList(response.data); console.log(response.data)})
        .catch(error => console.log(error))
  }


  useEffect(() => {
    const username = localStorage.getItem('username');
    if(username) {
      setUsername(username);
    }
    getMyAssetList(username);
    getMyInfo(username);
  }, []);



  ///////////////////////////////
  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (event) => {
    setItemPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };


  const myAssetListFilter = () => {
    const copyList = [...myAssetList];
    return copyList.filter(a => {
        if (choiceCatogory === 'all') {
          return a.CATEGORY_NUM >= 1;
        } else if (choiceCatogory === 'pc') {
          return a.CATEGORY_NUM === 5 || a.CATEGORY_NUM === 6 || a.CATEGORY_NUM === 1;
        } else if (choiceCatogory === 'sw') {
          return a.CATEGORY_NUM >= 7 && a.CATEGORY_NUM <= 12 || a.CATEGORY_NUM === 2;
        } else if (choiceCatogory === 'etc') {
          return a.CATEGORY_NUM >= 13 && a.CATEGORY_NUM <= 17 || a.CATEGORY_NUM === 3;
        } else {
          return a.CATEGORY_NUM === 18 || a.CATEGORY_NUM === 4;
        }
      }

  )}

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const totalPages = Math.ceil(myAssetListFilter().length / itemsPerPage);
  /* 페이지네이션 */
  /* const totalPages = Math.ceil(data.length / itemsPerPage); */
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹

  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages); // 끝 페이지

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  return (
      <main id="main" className="main">
        {
            openModal && <ReturnReqModal setOpenModal={setOpenModal} handleSubmit={handleSubmit} handleChange={handleChange} todayTime={todayTime} inputTitle={inputTitle} inputComment={inputComment} setInputComment={setInputComment} setInputTitle={setInputTitle} myAssetList={myAssetList} myAssetNum={myAssetNum} username={username} setOpenAlert={setOpenAlert} myInfo={myInfo}/>
        }
        {
          openCancelMddal && <ReturnCancelModal setOpenCancelModal={setOpenCancelModal} myAssetList={myAssetList} myAssetNum={myAssetNum} getMyAssetList={getMyAssetList} username={username} setOpenCancelAlert={setOpenCancelAlert} token={token} setOpenAlert={setOpenAlert}/>
        }

        { openAlert && <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-1"></i>
          신청완료되었습니다. 승인을 기다려주세요
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenAlert(false)}></button>
        </div>}

        {openCancelAlert && <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-1"></i>
          신청이 취소되었습니다.
          <button type="button" className="btn-close" aria-label="Close" onClick={() => {setOpenCancelAlert(false)}}></button>
        </div>}



        <div className="pagetitle">
          <h1>나의 사용자산</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/user/userMain">Home</Link></li>
              <li className="breadcrumb-item active">My Assets</li>

            </ol>
          </nav>
        </div>




        <div className="card">
          <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h5 className="card-title">사용중인 자산 목록</h5>
            </div>
            <div className="col-6 text-right">
              <div className="print-control react-icon">
                  <AiTwotonePrinter onClick={() => window.print()}
                  title="프린트"/>
              </div>
            </div>
          </div>              
              {
                myAssetList.length > 0 ?
                    <>
            <select className='choiceCatogory' style={{width:'200px', marginBottom:'10px', height: '30px'}} onChange={(e) => {setChoiceCategory(e.target.value); setCurrentPage(1);}}>
              <option value="all">전체목록</option>
              <option value="pc">PC/노트북</option>
              <option value="sw">소프트웨어</option>
              <option value="etc">주변기기</option>
              <option value="server">서버</option>
            </select>

            {/* <!-- Default Table --> */}
            <table className="table table-borderless" style={{textAlign: 'center'}}>
              <thead>
              <tr className="table-light">
                <th scope="col">#</th>
                <th scope="col">자산종류</th>
                <th scope="col">자산번호</th>
                <th scope="col">자산스펙</th>
                <th scope="col">대여일자</th>
                <th scope="col">교환/반납</th>

              </tr>
              </thead>
                    <tbody>

                    {
                      myAssetListFilter().slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                      ).map((a, i) => {
                        return <tr key={i}>
                          <th scope="row">{(currentPage - 1) * itemsPerPage + i + 1}</th>
                          <td>{a.ASSETS_NAME}</td>
                          <td>{a.ASSETS_DETAIL_NAME}</td>
                          <td style={{fontSize:"14px", color: "gray", width: '800px'}}>{a.SPEC_CPU!==undefined? a.SPEC_CPU+' |':''}
                            {a.SPEC_RAM!==undefined? a.SPEC_RAM+"|":''}
                            {a.SPEC_MAINBOARD!==undefined? a.SPEC_MAINBOARD+"|":''}
                            {a.SPEC_POWER!==undefined?a.SPEC_POWER+'|':''}
                            {a.SPEC_GPU!==undefined?a.SPEC_GPU+'|':''}
                            {a.SPEC_HDD!==undefined?a.SPEC_HDD+'|':''}
                            {a.SPEC_SSD!==undefined?a.SPEC_SSD+"|":''}
                            {a.SPEC_OPS!==undefined?a.SPEC_OPS+"|":''}
                            {a.SPEC_MFG!==undefined?a.SPEC_MFG+"|":''}
                            {a.SPEC_SERIEL!==undefined?a.SPEC_SERIEL+"|":''}
                            {/*{a.SPEC_PURCHASE_DATE!==undefined?a.SPEC_PURCHASE_DATE+" |":''}*/}
                            {a.SPEC_WARRANTY!==undefined?a.SPEC_WARRANTY+"|":''}
                            {a.SW_MFG!==undefined?a.SW_MFG+"|":''}
                            {a.SW_SPEC_SERIEL!==undefined?a.SW_SPEC_SERIEL+"|":''}
                            {a.SW_SPEC_WARRANTY!==undefined?a.SW_SPEC_WARRANTY+"|":''}
                            {/*{a.SW_PURCHASE_DATE!==undefined?a.SW_PURCHASE_DATE+" |":''}*/}
                            {/*{a.SW_PRICE!==undefined?a.SW_PRICE+" |":''}*/}
                            {a.SERVER_MFG!==undefined?a.SERVER_MFG+"|":''}
                            {/*{a.SERVER_PRICE!==undefined?a.SERVER_PRICE+" |":''}*/}
                            {a.SERVER_CAPA!==undefined?a.SERVER_CAPA+"|":''}
                            {a.SERVER_INTERFACE!==undefined?a.SERVER_INTERFACE+"|":''}
                            {a.SERVER_AVERAGE_LIFE!==undefined?a.SERVER_AVERAGE_LIFE+"|":''}
                            {a.SERVER_RPM!==undefined?a.SERVER_RPM+"|":''}
                            {a.SERVER_DATARECOVERY_LIFE!==undefined?a.SERVER_DATARECOVERY_LIFE+"|":''}
                            {a.ETC_MFG!==undefined?a.ETC_MFG+"|":''}
                            {a.ETC_SPEC_WARRANTY!==undefined?a.ETC_SPEC_WARRANTY+"|":''}
                            {/*{a.ETC_PURCHASE_DATE!==undefined?a.ETC_PURCHASE_DATE+" |":''}*/}
                            {a.ETC_PRICE!==undefined?a.ETC_PRICE+"|":''}
                          </td>
                          <td>{rentDate(a.RENT_DATE)}</td>
                          <td>

                            {

                              a.RETURN_STATUS===undefined || a.RETURN_STATUS === '승인' || a.RETURN_STATUS === '반려'?
                                  <button type="button" className="userMain-ask userMain-modalBtn" onClick={() => {setOpenModal(true); setMyAssetNum(a.ASSETS_NUM)}}>교환/반납</button>
                                  : <button type="button" className="userMain-ask userMain-modalBtn" style={{backgroundColor: "#b5bfd1", paddingLeft: '7px', paddingRight: '7px'}} onClick={() => {setOpenCancelModal(true); setMyAssetNum(a.ASSETS_NUM)}}>{a.RETURN_KIND}취소</button>

                            }
                          </td>

                        </tr>
                      })
                    }
                    </tbody>



            </table>
                    </>
                    :
                    <div style={{margin:'0 auto'}}>
                    <img src="../assets/img/ittam4.png" alt="iii" style={{width: '500px'}}/>
                    </div>

              }
            {/*  <!-- End Default Table Example --> */}
          </div>
        </div>
        {/* 페이징네이션 */}
        <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            startPage={startPage}
            endPage={endPage}
            handleClick={handleClick}
        />



      </main>


  );
}


export default UserMain_using;
