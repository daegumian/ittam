import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Style.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DepartChart from '../../component/Chart/DepartChart';
import AssetStickChart from '../../component/Chart/AssetStickChart';
import CPUChart from '../../component/Chart/CPUChart';
import GPUChart from '../../component/Chart/GPUChart';
import MFGChart from '../../component/Chart/MFGChart';
import DepartAssetChart from '../../component/Chart/DepartAssetChart';
import AssetRadialBarChart from '../../component/Chart/AssetRadialBarChart';
import SWMFGChart from '../../component/Chart/SWMFGChart';
import EtcMFGChart from '../../component/Chart/EtcMFGChart';
import ServerMFGChart from '../../component/Chart/ServerMFGChart';
import { tokenInfoContext } from '../../component/TokenInfoProvider';

function Reports() {
  const { userRole, username } = useContext(tokenInfoContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole !== 'ROLE_ADMIN' && userRole !== 'ROLE_HIGH_ADMIN') {
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

  const [cardNum, setCardNum] = useState({});
  const [departNum, setDepartNum] = useState();
  const [stickNum, setStickNum] = useState();
  const [CPUNum, setCPUNum] = useState();
  const [GPUNum, setGPUNum] = useState();
  const [MFGNum, setMFGNum] = useState();
  const [categoryNum, setCategoryNum] = useState();
  const [SWMFGNum, setSWMFGMun] = useState();
  const [EtcMFGNum, setEtcMFGNum] = useState();
  const [ServerMFGNum, setServerMFGNum] = useState();
  const [departAssetNum, setDepartAssetNum] = useState();

  const getCardNum = () => {
    axios({
      url: '/reports/getCardNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setCardNum(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDepartNum = () => {
    axios({
      url: '/reports/getDepartNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setDepartNum(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAssetStickNum = () => {
    axios({
      url: '/reports/getAssetStickNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setStickNum(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCPUNum = () => {
    axios({
      url: '/reports/getCPUNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setCPUNum(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getGPUNum = () => {
    axios({
      url: '/reports/getGPUNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setGPUNum(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMFGNum = () => {
    axios({
      url: '/reports/getMFGNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setMFGNum(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRadialBarNum = () => {
    axios({
      url: '/reports/getRadialBarNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response.data);
        setCategoryNum(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSWMFGNum = () => {
    axios({
      url: '/reports/getSWMFGNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setSWMFGMun(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEtcMFGNum = () => {
    axios({
      url: '/reports/getEtcMFGNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setEtcMFGNum(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getServerMFGNum = () => {
    axios({
      url: '/reports/getServerMFGNum',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setServerMFGNum(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getDepartAsset = () => {
    axios({
      url: '/reports/getDepartAsset',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setDepartAssetNum(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCardNum();
    getDepartNum();
    getAssetStickNum();
    getCPUNum();
    getGPUNum();
    getMFGNum();
    getRadialBarNum();
    getSWMFGNum();
    getEtcMFGNum();
    getServerMFGNum();
    getDepartAsset();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>리포트</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <Link to="/admin/adminMain">Report</Link>
            </li>
          </ol>
        </nav>
      </div>

      <section className="section dashboard">
        <div className="row">
          {/* <!-- Left side columns --> */}
          <div className="col-lg-12">
            <div className="row">
              {/*  <!-- Sales Card --> */}
              <div className="col-xxl-4 col-md-4">
                <div
                  className="card info-card sales-card"
                  style={{ backgroundColor: 'rgb(219 228 245)' }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontWeight: '800', fontSize: '20px' }}
                    >
                      총 사원수
                    </h5>

                    <div
                      className="d-flex align-items-center"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-box-arrow-in-up-right"></i>
                        </div> */}
                      <div className="ps-3">
                        <h6 style={{ fontSize: '50px' }}>
                          {cardNum.allUsersNum}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Sales Card --> */}
              {/*  <!-- Sales Card --> */}
              <div className="col-xxl-4 col-md-4">
                <div
                  className="card info-card sales-card"
                  style={{ backgroundColor: 'rgb(219 228 245)' }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontWeight: '800', fontSize: '20px' }}
                    >
                      총 자산수
                    </h5>

                    <div
                      className="d-flex align-items-center"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-box-arrow-in-up-right"></i>
                        </div> */}
                      <div className="ps-3">
                        <h6 style={{ fontSize: '50px' }}>
                          {cardNum.allAssetsNum}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Sales Card --> */}
              {/*  <!-- Sales Card --> */}
              <div className="col-xxl-4 col-md-4">
                <div
                  className="card info-card sales-card"
                  style={{ backgroundColor: 'rgb(219 228 245)' }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontWeight: '800', fontSize: '20px' }}
                    >
                      자산사용률
                    </h5>

                    <div
                      className="d-flex align-items-center"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div className="ps-3">
                        {cardNum !== undefined ? (
                          <h6 style={{ fontSize: '50px' }}>
                            {Math.round(
                              (cardNum.usingAssetsNum / cardNum.allAssetsNum) *
                                100
                            )}
                            %
                          </h6>
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Sales Card --> */}
              {/*  <!-- Sales Card --> */}
              {/*<div className="col-xxl-3 col-md-3">*/}
              {/*  <div className="card info-card sales-card" style={{ backgroundColor: 'rgb(219 228 245)' }}>*/}

              {/*    <div className="card-body">*/}
              {/*      <h5 className="card-title" style={{ fontWeight: "800", fontSize: '20px' }}>이번 달 자산 구매비</h5>*/}

              {/*      <div className="d-flex align-items-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>*/}
              {/*        /!* <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">*/}
              {/*          <i className="bi bi-box-arrow-in-up-right"></i>*/}
              {/*        </div> *!/*/}
              {/*        <div className="ps-3">*/}
              {/*          <h6 style={{ fontSize: '50px' }}>256</h6>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}

              {/*  </div>*/}
              {/*</div>/!* <!-- End Sales Card --> *!/*/}

              <section className="section">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          부서별 사원 비율
                        </h5>
                        {departNum !== undefined ? (
                          <DepartChart departNum={departNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          부서별 자산 현황
                        </h5>
                        {departAssetNum !== undefined ? (
                          <DepartAssetChart departAssetNum={departAssetNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          자산 현황
                        </h5>
                        {stickNum !== undefined ? (
                          <AssetStickChart stickNum={stickNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          카테고리별 사용률
                        </h5>
                        {categoryNum !== undefined ? (
                          <AssetRadialBarChart categoryNum={categoryNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <i className="bi bi-laptop" style={{ fontSize: '30px' }}>
                    {' '}
                    PC/노트북
                  </i>
                  <div className="col-lg-4">
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          CPU
                        </h5>
                        {CPUNum !== undefined ? (
                          <CPUChart CPUNum={CPUNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          GPU
                        </h5>
                        {GPUNum !== undefined ? (
                          <GPUChart GPUNum={GPUNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          제조사
                        </h5>
                        {MFGNum !== undefined ? (
                          <MFGChart MFGNum={MFGNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <i
                      className="bi bi-file-earmark-word"
                      style={{ fontSize: '30px' }}
                    >
                      {' '}
                      SW
                    </i>
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          SW 제조사
                        </h5>
                        {SWMFGNum !== undefined ? (
                          <SWMFGChart SWMFGNum={SWMFGNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <i className="bi bi-keyboard" style={{ fontSize: '30px' }}>
                      {' '}
                      주변기기
                    </i>
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          주변기기 제조사
                        </h5>
                        {EtcMFGNum !== undefined ? (
                          <EtcMFGChart EtcMFGNum={EtcMFGNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <i className="bi bi-hdd-stack" style={{ fontSize: '30px' }}>
                      {' '}
                      서버
                    </i>
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: 'rgb(219 228 245)',
                          borderRadius: '8px',
                        }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontWeight: '800' }}
                        >
                          서버 제조사
                        </h5>
                        {ServerMFGNum !== undefined ? (
                          <ServerMFGChart ServerMFGNum={ServerMFGNum} />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Reports;
