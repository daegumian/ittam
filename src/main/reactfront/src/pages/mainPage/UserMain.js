import { useContext, useEffect, useState } from 'react';
import '../../styles/Style.css';
import '../../styles/MainPageStyle/UserStyle.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DounutChart_user from '../../component/Chart/DonutChart';
import { tokenInfoContext } from '../../component/TokenInfoProvider';

function UserMain() {
  const { userRole } = useContext(tokenInfoContext);
  useEffect(() => {
    if (userRole !== 'ROLE_USER') {
      if (userRole === 'ROLE_USER') {
        navigate('/user/userMain');
      } else if (userRole === 'ROLE_ADMIN') {
        navigate('/admin/adminMain');
      } else if (userRole === 'ROLE_HIGH_ADMIN') {
        navigate('/highadmin/highAdminMain');
      } else if (userRole === 'none') {
        navigate('/');
      }
    }
  }, []);

  const token = localStorage.getItem('token');

  const [username, setUsername] = useState('');
  const [userCnt, setUserCnt] = useState({});
  const [myAssetChartCnt, setMyAssetChartCnt] = useState();
  const [noticeList, setNoticeList] = useState([]);

  const addDate = (add) => {
    let now = new Date(add);
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return (
        todayYear +
        '-' +
        (todayMonth >= 10 ? todayMonth : '0' + todayMonth) +
        '-' +
        (todayDate >= 10 ? todayDate : '0' + todayDate)
    );
  };

  const noticedate = (notice) => {
    let now = new Date(notice);
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return (
      todayYear +
      '-' +
      (todayMonth >= 10 ? todayMonth : '0' + todayMonth) +
      '-' +
      (todayDate >= 10 ? todayDate : '0' + todayDate)
    );
  };

  const [recentAssets, setRecentAssets] = useState([]);
  const [nnn, setNnn] = useState(5);

  const getRecentAssetsList = (nnn) => {
    axios({
      url: '/mainPage/getRecentAssetsList',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        nnn: nnn,
      },
    })
        .then((response) => {
          setRecentAssets(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRecentAssetsList(nnn);
  }, [nnn]);

  const getMyAssetChartCnt = (username) => {
    axios({
      url: '/mainPage/getMyAssetChartCnt',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    })
      .then((response) => setMyAssetChartCnt(response.data))
      .catch((error) => console.log(error));
  };

  const getUserCnt = (username) => {
    axios({
      url: '/mainPage/getUserCnt',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    })
      .then((response) => setUserCnt(response.data))
      .catch((error) => console.log(error));
  };
  const getNoticeList = () => {
    axios({
      url: '/mainPage/getNoticeList',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setNoticeList(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const navigate = useNavigate(); // navigate 함수 생성
  const handleClickEvent = (notice_num) => {
    navigate(`/NoticeDetail/${notice_num}`);
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUsername(username);
    }
    getUserCnt(username);
    getMyAssetChartCnt(username);
    getNoticeList();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>사원 홈</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <Link to="/user/userMain">Home</Link>
            </li>
          </ol>
        </nav>
      </div>

      <section className="contact">
        <div className="row">
          <div className="col-lg-6">
            <Link to="/user/userMain_using">
              <div className="info-box card">
                <i className="bi bi-check2-square"></i>
                <h3>내가 사용 중인 자산</h3>
                <span style={{ fontSize: '14px', color: '#777' }}>
                  사용중: {userCnt.using}건 | 반납신청: {userCnt.return}건 |
                  교환신청: {userCnt.exchange}건
                </span>
              </div>
            </Link>
          </div>

          <div className="col-lg-6">
            <Link to="/user/userMain_request">
              <div className="info-box card">
                <i className="bi bi-clipboard-check"></i>
                <h3>내 사용/구매신청 목록</h3>
                <span style={{ fontSize: '14px', color: '#777' }}>
                  사용신청건: {userCnt.usingReq}건 | 구매신청건:{' '}
                  {userCnt.buyReq}건
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="row">
          <div className="col-lg-3">
            <img
              src="../assets/img/ittam2.png"
              style={{ width: '300px', marginLeft: '40px' }}
            />
          </div>

          <div className="col-lg-3">
            <div className="card">
              <div className="card-body" style={{ height: '325px' }}>
                <h5 className="card-title" style={{ fontWeight: '800' }}>
                  나의 자산 현황
                </h5>
                {myAssetChartCnt !== undefined ? (
                  <DounutChart_user myAssetChartCnt={myAssetChartCnt} />
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {/*{myAssetChartCnt && myAssetChartCnt.size > 0 ? (*/}
                {/*    <DounutChart_user myAssetChartCnt={myAssetChartCnt}/>*/}
                {/*) : (*/}
                {/*    <div className="empty-graph-placeholder">*/}
                {/*      <img src="../assets/img/ittam2.png" alt="No Data Available"/>*/}
                {/*    </div>*/}
                {/*)}*/}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body" style={{ padding: '30px' }}>
                <i
                  className="bi bi-list-check"
                  style={{
                    fontSize: '38px',
                    lineHeight: '0',
                    color: '#4154f1',
                  }}
                ></i>
                <Link to="/noticeUser">
                  <h5
                    className="card-title"
                    style={{
                      fontWeight: '800',
                      display: 'inline',
                      marginLeft: '10px',
                      marginBottom: '20px',
                    }}
                  >
                    공지사항 <span>| 전체보기</span>
                  </h5>
                </Link>
                <table className="table table-sm" style={{ marginTop: '10px' }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '40px' }}>
                        #
                      </th>
                      <th scope="col" style={{ width: '80px' }}>
                        작성자
                      </th>
                      <th scope="col">제목</th>
                      <th scope="col" style={{ width: '110px' }}>
                        등록일
                      </th>
                      <th scope="col" style={{ width: '110px' }}>
                        만료일
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {noticeList.map((a, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">
                            <i
                              className="bi bi-pin-angle-fill"
                              style={{
                                fontSize: '20px',
                                lineHeight: '0',
                                color: '#000',
                              }}
                            ></i>
                          </th>
                          <td>{a.notice_name}</td>
                          <td onClick={() => handleClickEvent(a.notice_num)}>
                            <Link to="##">{a.notice_title}</Link>
                          </td>
                          <td>{noticedate(a.notice_regdate)}</td>
                          <td>{noticedate(a.notice_enddate)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>



      <div className="col-12">
        <div className="card top-selling overflow-auto">
          <div
              className="card-body pb-0"
              style={{ paddingTop: '20px' }}
          >
            <Link to="/itassets">
              <h5
                  className="card-title"
                  style={{ fontWeight: '800', display: 'inline' }}
              >
                최근자산구매사항 <span>| 전체보기</span>
              </h5>
            </Link>
            <select
                style={{ display: 'inline', marginLeft: '10px' }}
                onChange={(e) => {
                  setNnn(parseInt(e.target.value));
                }}
            >
              <option value="5">5개</option>
              <option value="7">7개</option>
              <option value="10">10개</option>
            </select>

            <table className="table" style={{ marginTop: '10px' }}>
              <thead>
              <tr className="table-light">
                <th scope="col" style={{ width: '100px' }}>
                  카테고리
                </th>
                <th scope="col" style={{ width: '100px' }}>
                  자산명
                </th>
                <th scope="col">자산스펙</th>
                <th scope="col" style={{ width: '100px' }}>
                  추가날짜
                </th>
                {/* <th scope="col">Revenue</th> */}
              </tr>
              </thead>
              <tbody>
              {recentAssets.map((a, i) => {
                return (
                    <tr key={i}>
                      <td scope="row" style={{ width: '100px' }}>
                        {a.CATEGORY_PARENT_NUM === 1
                            ? 'PC/노트북'
                            : a.CATEGORY_PARENT_NUM === 2
                                ? '소프트웨어'
                                : a.CATEGORY_PARENT_NUM === 3
                                    ? '주변기기'
                                    : '서버'}
                      </td>
                      <td>{a.ASSETS_NAME}</td>
                      <td
                          style={{
                            fontSize: '14px',
                            color: 'gray',
                            width: '800px',
                          }}
                      >
                        {a.SPEC_CPU !== undefined
                            ? a.SPEC_CPU + '|'
                            : ''}
                        {a.SPEC_RAM !== undefined
                            ? a.SPEC_RAM + '|'
                            : ''}
                        {a.SPEC_MAINBOARD !== undefined
                            ? a.SPEC_MAINBOARD + '|'
                            : ''}
                        {a.SPEC_POWER !== undefined
                            ? a.SPEC_POWER + '|'
                            : ''}
                        {a.SPEC_GPU !== undefined
                            ? a.SPEC_GPU + '|'
                            : ''}
                        {a.SPEC_HDD !== undefined
                            ? a.SPEC_HDD + '|'
                            : ''}
                        {a.SPEC_SSD !== undefined
                            ? a.SPEC_SSD + '|'
                            : ''}
                        {a.SPEC_OPS !== undefined
                            ? a.SPEC_OPS + '|'
                            : ''}
                        {a.SPEC_MFG !== undefined
                            ? a.SPEC_MFG + '|'
                            : ''}
                        {a.SPEC_SERIEL !== undefined
                            ? a.SPEC_SERIEL + '|'
                            : ''}
                        {/*{a.SPEC_PURCHASE_DATE!==undefined?a.SPEC_PURCHASE_DATE+" |":''}*/}
                        {/*{a.SPEC_WARRANTY!==undefined?a.SPEC_WARRANTY+" |":''}*/}
                        {a.SW_MFG !== undefined ? a.SW_MFG + '|' : ''}
                        {a.SW_SPEC_SERIEL !== undefined
                            ? a.SW_SPEC_SERIEL + '|'
                            : ''}
                        {a.SW_SPEC_WARRANTY !== undefined
                            ? a.SW_SPEC_WARRANTY + '|'
                            : ''}
                        {/*{a.SW_PURCHASE_DATE!==undefined?a.SW_PURCHASE_DATE+" |":''}*/}
                        {a.SW_PRICE !== undefined
                            ? a.SW_PRICE + '|'
                            : ''}
                        {a.SERVER_MFG !== undefined
                            ? a.SERVER_MFG + '|'
                            : ''}
                        {a.SERVER_PRICE !== undefined
                            ? a.SERVER_PRICE + '|'
                            : ''}
                        {a.SERVER_CAPA !== undefined
                            ? a.SERVER_CAPA + '|'
                            : ''}
                        {a.SERVER_INTERFACE !== undefined
                            ? a.SERVER_INTERFACE + '|'
                            : ''}
                        {a.SERVER_AVERAGE_LIFE !== undefined
                            ? a.SERVER_AVERAGE_LIFE + '|'
                            : ''}
                        {a.SERVER_RPM !== undefined
                            ? a.SERVER_RPM + '|'
                            : ''}
                        {a.SERVER_DATARECOVERY_LIFE !== undefined
                            ? a.SERVER_DATARECOVERY_LIFE + '|'
                            : ''}
                        {a.ETC_MFG !== undefined
                            ? a.ETC_MFG + '|'
                            : ''}
                        {a.ETC_SPEC_WARRANTY !== undefined
                            ? a.ETC_SPEC_WARRANTY + '|'
                            : ''}
                        {/*{a.ETC_PURCHASE_DATE!==undefined?a.ETC_PURCHASE_DATE+" |":''}*/}
                        {/*{a.ETC_PRICE !== undefined*/}
                        {/*    ? a.ETC_PRICE + ' |'*/}
                        {/*    : ''}*/}
                      </td>
                      <td>{addDate(a.ADD_DATE)}</td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </main>
  );
}

export default UserMain;
