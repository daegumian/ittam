import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Style.css';
import axios from 'axios';
import base64 from 'base-64';
import { tokenInfoContext } from './TokenInfoProvider';


function Header() {
  const token = localStorage.getItem('token');
  const { userRole, username } = useContext(tokenInfoContext);
  const [myInfo, setMyInfo] = useState({});
  const [myAlarmList, setMyAlarmList] = useState([]);
  const [myAlarmAdminList, setMyAlarmAdminList] = useState([]);
  const [myAlarmCnt, setMyAlarmCnt] = useState(0);
  const [myAlarmAdminCnt, setMyAlarmAdminCnt] = useState(0);
  const [tokenExpiration, setTokenExpiration] = useState(''); // 토큰 만료까지 남은 시간을 상태로 관리

  const navigate = useNavigate(); // navigate 함수 생성

  const regdate = (add) => {
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

  const getTokenExpirationDate = (token) => {
    if (token != undefined) {
      let payload = token.substring(
        token.indexOf('.') + 1,
        token.lastIndexOf('.')
      );

      localStorage.setItem('token', token);
      let dec = JSON.parse(base64.decode(payload));
      if (!dec.exp) return null;
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(dec.exp);
      return expirationDate;
    }
  };

  const tokenExpirationDate = getTokenExpirationDate(token);

  const formatExpirationDate = (expirationDate) => {
    if (!expirationDate) return '';
    return expirationDate.toLocaleString(); // 원하는 형식으로 날짜를 표시할 수 있습니다.
  };

  // 토큰 만료까지 남은 시간을 계산하는 함수
  const calculateTokenRemainingTime = (expirationDate) => {
    if (!expirationDate) return '';
    const currentTime = new Date();
    const remainingTime = expirationDate - currentTime;
    if (remainingTime <= 0) return '토큰 만료됨';
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return `${minutes}분 ${seconds}초`;
  };

  const getMyInfo = (username) => {
    axios({
      url: '/mainPage/getMyInfo',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    })
      .then((response) => {
        setMyInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getMyAlarmList = (username) => {
    axios({
      url: '/mainPage/getMyAlarmList',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    })
      .then((response) => {
        setMyAlarmList(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getMyAlarmCnt = (username) => {
    axios({
      url: '/mainPage/getMyAlarmCnt',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    })
      .then((response) => {
        console.log(response.data);
        setMyAlarmCnt(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleMyAlamConfirm = (e, alarm_num, alarm_type) => {
    e.stopPropagation();
    axios({
      url: '/mainPage/handleMyAlamConfirm',
      method: 'put',
      headers: {
        Authorization: token,
      },
      params: {
        alarm_num: alarm_num,
        alarm_type: alarm_type,
      },
    })
      .then((response) => {
        console.log(response.data);
        getMyAlarmList(username);
        getMyAlarmCnt(username);
      })
      .catch((error) => console.log(error));
    alarm_type === '교환' || alarm_type === '반납'
      ? navigate('/user/userMain_using')
      : navigate('/user/userMain_request');
  };

  /////////////////////////////////////////////////
  const getMyAlarmAdminList = (username) => {
    axios({
      url: '/mainPage/getMyAlarmAdminList',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    })
      .then((response) => {
        console.log(response.data);
        setMyAlarmAdminList(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleMyAlamAdminConfirm = (e, alarm_num) => {
    e.stopPropagation();
    axios({
      url: '/mainPage/handleMyAlamAdminConfirm',
      method: 'put',
      headers: {
        Authorization: token,
      },
      params: {
        alarm_num: alarm_num,
      },
    })
      .then((response) => {
        console.log(response.data);
        getMyAlarmAdminList(username);
        getMyAlarmAdminCnt(username);
      })
      .catch((error) => console.log(error));
    // alarm_type === '교환' || alarm_type === '반납' ?
    //     navigate("/user/userMain_using") :
    //     navigate("/user/userMain_request")
  };

  const getMyAlarmAdminCnt = (username) => {
    axios({
      url: '/mainPage/getMyAlarmAdminCnt',
      method: 'get',
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    })
      .then((response) => {
        console.log(response.data);
        setMyAlarmAdminCnt(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (tokenExpirationDate) {
      getMyInfo(username);
      if (userRole === 'ROLE_USER') {
        getMyAlarmList(username);
        getMyAlarmCnt(username);
      } else {
        getMyAlarmAdminList(username);
        getMyAlarmAdminCnt(username);
      }

      // 토큰 만료까지 남은 시간을 1초마다 업데이트하는 코드
      const intervalId = setInterval(() => {
        if (tokenExpirationDate) {
          setTokenExpiration(calculateTokenRemainingTime(tokenExpirationDate));
        }
      }, 1000);

      // 컴포넌트가 언마운트될 때 interval 해제
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  // console.log('토큰 만료 시간:', formatExpirationDate(tokenExpirationDate));

  if (window.location.pathname === '/') return null;

  const handleToggleClick = () => {
    // React에서는 body에 직접 접근하지 않고, 상태를 사용하여 UI를 변경합니다.
    // 여기에서는 상태를 토글하는 방식으로 body의 classList를 변경하는 효과를 달성합니다.
    document.body.classList.toggle('toggle-sidebar');
  };



  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        {userRole === 'ROLE_USER' && (
          <Link to="/user/userMain" className="logo d-flex align-items-center">
            <img src="/assets/img/ittam2.png" alt=""></img>
            <span className="d-none d-lg-block">IT 자산 관리 시스템</span>
          </Link>
        )}
        {userRole === 'ROLE_ADMIN' && (
          <Link
            to="/admin/adminMain"
            className="logo d-flex align-items-center"
          >
            <img src="/assets/img/ittam2.png" alt=""></img>
            <span className="d-none d-lg-block">IT 자산 관리 시스템</span>
          </Link>
        )}
        {userRole === 'ROLE_HIGH_ADMIN' && (
          <Link
            to="/highadmin/highAdminMain"
            className="logo d-flex align-items-center"
          >
            <img src="/assets/img/ittam2.png" alt=""></img>
            <span className="d-none d-lg-block">IT 자산 관리 시스템</span>
          </Link>
        )}
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={handleToggleClick}
        ></i>
      </div>
      {/* <!-- End Logo --> */}


      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <Link to="####" className="nav-link nav-icon search-bar-toggle ">
              <i className="bi bi-search"></i>
            </Link>
          </li>
          {/* <!-- End Search Icon--> */}

          <div className="token-expiration tokenTime">
            {tokenExpirationDate && (
              <span>{calculateTokenRemainingTime(tokenExpirationDate)}</span>
            )}
          </div>

          <li className="nav-item dropdown">
            <Link
              to="####"
              className="nav-link nav-icon"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-bell"></i>
              {userRole === 'ROLE_USER' && myAlarmCnt !== 0 && (
                <span className="badge bg-primary badge-number">
                  {myAlarmCnt}
                </span>
              )}
              {userRole === 'ROLE_ADMIN' && myAlarmAdminCnt !== 0 && (
                <span className="badge bg-primary badge-number">
                  {myAlarmAdminCnt}
                </span>
              )}
            </Link>
            {/* <!-- End Notification Icon --> */}

            <ul
              className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
              style={{
                overflowY: 'scroll',
                maxHeight: '486px',
                width: '350px',
              }}
            >
              <li className="dropdown-header">
                {userRole === 'ROLE_USER' ? myAlarmCnt : myAlarmAdminCnt}개의
                알림이 있습니다.
              </li>

              {userRole === 'ROLE_USER' &&
                myAlarmList.map((a, i) => {
                  return (
                    <div
                      onClick={(e) =>
                        handleMyAlamConfirm(e, a.ALARM_NUM, a.ALARM_TYPE)
                      }
                      key={i}
                      style={{ cursor: 'pointer' }}
                    >
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                      <li className="notification-item">
                        {a.ALARM_STATUS === '승인' ? (
                          <i className="bi bi-check-circle text-success"></i>
                        ) : (
                          <i className="bi bi-exclamation-circle text-danger"></i>
                        )}
                        {a.ALARM_TYPE === '교환' || a.ALARM_TYPE === '반납' ? (
                          <div>
                            <h4>
                              관리자 {a.ALARM_TYPE}
                              {a.ALARM_STATUS}
                            </h4>
                            <p>
                              요청하신 {a.ASSETS_NAME}({a.ASSETS_DETAIL_NAME})의{' '}
                              {a.ALARM_TYPE}요청건이 {a.ALARM_STATUS}되었습니다.
                            </p>
                            <p>{regdate(a.ALARM_REGDATE)}</p>
                          </div>
                        ) : a.ALARM_TYPE === '사용신청' ? (
                          <div>
                            <h4>관리자 사용{a.ALARM_STATUS}</h4>
                            <p>
                              요청하신 {a.ASSETS_NAME}({a.ASSETS_DETAIL_NAME})의{' '}
                              {a.ALARM_TYPE}요청건이 {a.ALARM_STATUS}되었습니다.
                            </p>
                            <p>{regdate(a.ALARM_REGDATE)}</p>
                          </div>
                        ) : (
                          <div>
                            <h4>관리자 구매{a.ALARM_STATUS}</h4>
                            <p>
                              요청하신 {a.USERQ_KIND}의 {a.ALARM_TYPE}{' '}
                              {a.ASSETS_STATUS}처리가 완료되었습니다.
                            </p>
                            <p>{regdate(a.ALARM_REGDATE)}</p>
                          </div>
                        )}
                      </li>
                    </div>
                  );
                })}

              {userRole === 'ROLE_ADMIN' &&
                myAlarmAdminList.map((a, i) => {
                  return (
                    <div
                      onClick={(e) => handleMyAlamAdminConfirm(e, a.ALARM_NUM)}
                      key={i}
                      style={{ cursor: 'pointer' }}
                    >
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                      <li className="notification-item">
                        {a.ALARM_STATUS === '승인' ? (
                          <i className="bi bi-check-circle text-success"></i>
                        ) : (
                          <i className="bi bi-exclamation-circle text-danger"></i>
                        )}
                        {a.ALARM_TYPE === '수리' || a.ALARM_TYPE === '폐기' ? (
                          <div>
                            <h4>
                              최종관리자 {a.ALARM_TYPE}
                              {a.ALARM_STATUS}
                            </h4>
                            <p>
                              요청하신 {a.ASSETS_NAME}({a.ASSETS_DETAIL_NAME})의{' '}
                              {a.ALARM_TYPE}요청건이 {a.ALARM_STATUS}되었습니다.
                            </p>
                            <p>{regdate(a.ALARM_REGDATE)}</p>
                          </div>
                        ) : (
                          <div>
                            <h4>최종관리자 구매{a.ALARM_STATUS}</h4>
                            <p>
                              요청하신 {a.CATEGORY_NAME}의 {a.ALARM_TYPE}
                              요청건이 {a.ALARM_STATUS}되었습니다.
                            </p>
                            <p>{regdate(a.ALARM_REGDATE)}</p>
                          </div>
                        )}
                      </li>
                    </div>
                  );
                })}

              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              {/*<li className="dropdown-footer">*/}
              {/*  <Link to="####">Show all notifications</Link>*/}
              {/*</li>*/}
            </ul>
            {/* <!-- End Notification Dropdown Items --> */}
          </li>
          {/* <!-- End Notification Nav --> */}


          <li className="nav-item dropdown pe-3">
            <Link
              to="####"
              className="nav-link nav-profile d-flex align-items-center pe-0"
              data-bs-toggle="dropdown"
            >
              {/*<img*/}
              {/*    src="/assets/img/profile-img.jpg"*/}
              {/*    alt="Profile"*/}
              {/*    className="rounded-circle"*/}
              {/*></img>*/}
              {myInfo.role === 'ROLE_HIGH_ADMIN' ? (
                <i
                  className="bx bxs-user-circle"
                  style={{ fontSize: '40px', color: '#483D8B' }}
                ></i>
              ) : myInfo.role === 'ROLE_ADMIN' ? (
                <i
                  className="bx bxs-user-circle"
                  style={{ fontSize: '40px', color: '#4682B4' }}
                ></i>
              ) : (
                <i
                  className="bx bxs-user-circle"
                  style={{ fontSize: '40px', color: '#6495ED' }}
                ></i>
              )}
              <span
                className="d-none d-md-block dropdown-toggle ps-2"
                style={{ fontSize: '20px' }}
              >
                {myInfo.user_name}
              </span>
            </Link>
            {/* <!-- End Profile Iamge Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{myInfo.user_name}</h6>
                <span>{username}</span>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>

              <li>
                <Link
                  to="/mypage"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>


              <li>
                <button type="button" className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </button>
              </li>


              <li>
                <hr className="dropdown-divider"></hr>
              </li>

              <li>
                <Link
                  to="/logout"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>
            {/* <!-- End Profile Dropdown Items --> */}
          </li>
          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
      {/* <!-- End Icons Navigation --> */}

    </header>
  );
}

export default Header;
