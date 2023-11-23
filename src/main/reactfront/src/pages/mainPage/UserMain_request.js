import '../../styles/Style.css';

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReqDetailModal from '../../component/Modal/ReqDetailModal';
import { tokenInfoContext } from '../../component/TokenInfoProvider';

function UserMain_request() {
  const { userRole } = useContext(tokenInfoContext);
  const navigate = useNavigate();
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
    const [myRequestList, setMyRequestList] = useState([]);
    const [openReqDetailModal, setOpenReqDetailModal] = useState(false);
    const [userq_num, setUserq_num] = useState(0);
    const [myInfo, setMyInfo] = useState({});

    const count_using = myRequestList.filter(a => a.userq_yn.includes('관리자사용승인') || (a.userq_yn.includes('사원사용'))).length;
    const count_buy = myRequestList.filter(a => a.userq_yn.includes('구매') && (a.userq_yn.includes('사원구매') || a.userq_yn.includes('관리자구매승인'))).length;

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


    const getMyRequestList = (username) => {

        axios({
            url: "/mainPage/getMyRequestList",
            method: "get",
            headers: {
                Authorization : token
            },
            params: {
                username: username
            }
        })
            .then(response => {setMyRequestList(response.data); console.log(response.data);})
            .catch(error => console.log(error))
    }


    useEffect(() => {
        const username = localStorage.getItem('username');
        if(username) {
            setUsername(username);
        }
        getMyRequestList(username);
        getMyInfo(username);

    }, []);





    return (
        <main id="main" className="main">
            {openReqDetailModal && <ReqDetailModal setOpenReqDetailModal={setOpenReqDetailModal} username={username} myRequestList={myRequestList} userq_num={userq_num} getMyRequestList={getMyRequestList} token={token} myInfo={myInfo}/>}

            <div className="pagetitle">
                <h1>사용 및 구매신청 목록</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/user/userMain">Home</Link></li>
                        <li className="breadcrumb-item active">Using & Buy List</li>
                    </ol>
                </nav>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"></h5>



                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-justified" type="button" role="tab" aria-controls="home" aria-selected="true">사용신청</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-justified" type="button" role="tab" aria-controls="profile" aria-selected="false">구매신청</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="home-justified" role="tabpanel" aria-labelledby="home-tab">


                            {/* <!-- Default Table --> */}
                            <table className="table table-borderless" style={{textAlign: 'center'}}>
                                <thead>
                                <tr className="table-light">
                                    <th scope="col">번호</th>
                                    <th scope="col">신청종류</th>
                                    <th scope="col">신청자산</th>
                                    <th scope="col">신청제목</th>
                                    <th scope="col">신청개수</th>
                                    <th scope="col">신청날짜</th>
                                    <th scope="col">처리상태</th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    myRequestList.filter(a => a.userq_yn.includes('관리자사용승인') || (a.userq_yn.includes('사원사용'))).map((a, i) => {
                                        return <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{a.userq_yn.includes("사용") ? "사용요청" : "구매요청"}</td>
                                            <td>{a.userq_kind}</td>
                                            <td><Link to="#" onClick={() => {setOpenReqDetailModal(true); setUserq_num(a.userq_num)}}>{a.userq_title}</Link></td>
                                            <td>{a.userq_count}</td>
                                            <td>{a.userq_regdate}</td>
                                            <td style={{color: 'blue', fontWeight: '600'}}>{a.userq_yn.includes('최종사용승인') ? "승인" : (a.userq_yn.includes('사원사용') || a.userq_yn.includes('관리자사용승인') ? "승인대기" : (a.userq_yn.includes('반려') ? '반려' : '승인대기'))}</td>

                                        </tr>
                                    })
                                }



                                {
                                    myRequestList.filter(a => a.userq_yn.includes('사용') && (a.userq_yn.includes('최종사용승인') || a.userq_yn.includes('반려'))).map((a, i) => {
                                        return <tr key={i}>
                                            <th scope="row">{count_using + i + 1}</th>
                                            <td>{a.userq_yn.includes("사용") ? "사용요청" : "구매요청"}</td>
                                            <td>{a.userq_kind}</td>
                                            <td><Link to="#" onClick={() => {setOpenReqDetailModal(true); setUserq_num(a.userq_num)}}>{a.userq_title}</Link></td>
                                            <td>{a.userq_count}</td>
                                            <td>{a.userq_regdate}</td>
                                            <td>{a.userq_yn.includes('최종사용승인') ? "승인" : (a.userq_yn.includes('사원사용') ? "승인대기" : (a.userq_yn.includes('반려') ? '반려' : '승인대기'))}</td>

                                        </tr>
                                    })


                                }

                                </tbody>
                            </table>
                            {/*  <!-- End Default Table Example --> */}
                        </div>



                        {/* /////////////구매신청///////////// */}
                        <div class="tab-pane fade" id="profile-justified" role="tabpanel" aria-labelledby="profile-tab">

                            {/* <!-- Default Table --> */}
                            <table className="table table-borderless" style={{textAlign: 'center'}}>
                                <thead>
                                <tr className="table-light">
                                    <th scope="col">#</th>
                                    <th scope="col">신청종류</th>
                                    <th scope="col">신청자산</th>
                                    <th scope="col">신청제목</th>
                                    <th scope="col">신청개수</th>
                                    <th scope="col">신청날짜</th>
                                    <th scope="col">처리상태</th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    myRequestList.filter(a => a.userq_yn.includes('구매') && (a.userq_yn.includes('사원구매') || a.userq_yn.includes('관리자구매승인'))).map((a, i) => {
                                        return <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{a.userq_yn.includes("사용") ? "사용요청" : "구매요청"}</td>
                                            <td>{a.userq_kind}</td>
                                            <td><Link to="#" onClick={() => {setOpenReqDetailModal(true); setUserq_num(a.userq_num)}}>{a.userq_title}</Link></td>
                                            <td>{a.userq_count}</td>
                                            <td>{a.userq_regdate}</td>
                                            <td style={{color: 'blue', fontWeight: '600'}}>{a.userq_yn.includes('최종구매승인') ? "승인" : (a.userq_yn.includes('사원구매') ? "승인대기" : (a.userq_yn.includes('반려') ? '반려' : '승인대기'))}</td>

                                        </tr>
                                    })
                                }



                                {
                                    myRequestList.filter(a => a.userq_yn.includes('구매') && (a.userq_yn.includes('반려') || a.userq_yn.includes('최종구매승인'))).map((a, i) => {
                                        return <tr key={i}>
                                            <th scope="row">{count_buy + i + 1}</th>
                                            <td>{a.userq_yn.includes("사용") ? "사용요청" : "구매요청"}</td>
                                            <td>{a.userq_kind}</td>
                                            <td><Link to="#" onClick={() => {setOpenReqDetailModal(true); setUserq_num(a.userq_num)}}>{a.userq_title}</Link></td>
                                            <td>{a.userq_count}</td>
                                            <td>{a.userq_regdate}</td>
                                            <td>{a.userq_yn.includes('최종구매승인') ? "승인" : (a.userq_yn.includes('사원구매') ? "승인대기" : (a.userq_yn.includes('반려') ? '반려' : '승인대기'))}</td>

                                        </tr>
                                    })


                                }

                                </tbody>
                            </table>
                            {/*  <!-- End Default Table Example --> */}
                        </div>

                    </div>



                </div>
            </div>


        </main>


    );
}

export default UserMain_request;