import '../../styles/Style.css';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReturnDetailModal_return from '../../component/Modal/ReturnDetailModal_return';
import ReturnDetailModal_exchange from '../../component/Modal/ReturnDetailModal_exchange';
import { Link, useNavigate } from 'react-router-dom';
import Pagenation from '../../component/Pagenation';
import { tokenInfoContext } from '../../component/TokenInfoProvider';

function ReturnExchange() {
  const { userRole, username } = useContext(tokenInfoContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole !== 'ROLE_ADMIN') {
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

  const [returnList, setReturnList] = useState([]);
  const [openModal_return, setOpenModal_return] = useState(false);
  const [openModal_exchange, setOpenModal_exchange] = useState(false);
  const [num, setNum] = useState(null);
  const [choice, setChoice] = useState('all');

  const getreturnList = () => {
    axios({
      url: '/mainPage/returnList',
      method: 'get',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setReturnList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        alert('데이터 조회에 실패하였습니다.');
      });
  };

  useEffect(() => {
    getreturnList();
  }, []);

  const count = returnList
    .filter((a) => {
      if (choice === 'all') {
        return a.RETURN_KIND === '교환' || a.RETURN_KIND === '반납';
      } else if (choice === 'exh') {
        return a.RETURN_KIND === '교환';
      } else {
        return a.RETURN_KIND === '반납';
      }
    })
    .filter((a) => a.RETURN_STATUS === '승인대기').length;

  function yyyymmdd(timestamp) {
    let d = new Date(timestamp); // Convert the passed timestamp to milliseconds
    let yyyy = d.getFullYear();
    let mm = ('0' + (d.getMonth() + 1)).slice(-2); // Months are zero based. Add leading 0.
    let dd = ('0' + d.getDate()).slice(-2); // Add leading 0.
    let hh = ('0' + d.getHours()).slice(-2);
    let min = ('0' + d.getMinutes()).slice(-2); // Add leading 0.

    let time = yyyy + '.' + mm + '.' + dd + ' ' + hh + ':' + min;

    return time;
  }

  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (event) => {
    setItemPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const copyReturnList = [...returnList];
  const returnList1 = () =>
    copyReturnList
      .filter((a) => {
        if (choice === 'all') {
          return a.RETURN_KIND === '교환' || a.RETURN_KIND === '반납';
        } else if (choice === 'exh') {
          return a.RETURN_KIND === '교환';
        } else {
          return a.RETURN_KIND === '반납';
        }
      })
      .filter((a) => a.RETURN_STATUS === '승인대기');
  const returnList2 = () =>
    copyReturnList
      .filter((a) => {
        if (choice === 'all') {
          return a.RETURN_KIND === '교환' || a.RETURN_KIND === '반납';
        } else if (choice === 'exh') {
          return a.RETURN_KIND === '교환';
        } else {
          return a.RETURN_KIND === '반납';
        }
      })
      .filter((a) => a.RETURN_STATUS !== '승인대기');

  const newReturnList = () => {
    return returnList1() && returnList2();
  };

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const totalPages = Math.ceil(newReturnList().length / itemsPerPage);
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
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>교환 및 반납 요청</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/adminMain">Home</Link>
              </li>
              <li className="breadcrumb-item active">Return & Exchange</li>
              {/*<li className="breadcrumb-item active">Breadcrumbs</li>*/}
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: '800' }}>
              교환 및 반납 요청
            </h5>
            <select
              className="choiceCatogory"
              style={{ width: '150px', marginBottom: '10px', height: '30px' }}
              onChange={(e) => {
                setChoice(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">전체목록</option>
              <option value="exh">교환</option>
              <option value="ret">반납</option>
            </select>

            {/* <!-- Default Table --> */}
            <table
              className="table table-borderless"
              style={{ textAlign: 'center' }}
            >
              <thead>
                <tr className="table-light">
                  <th scope="col">번호</th>
                  <th scope="col">신청종류</th>
                  <th scope="col">사원명</th>
                  <th scope="col">자산명</th>
                  <th scope="col">신청제목</th>
                  <th scope="col">신청날짜</th>
                  <th scope="col">승인처리</th>
                  <th scope="col">처리상태</th>
                </tr>
              </thead>
              <tbody>
                {returnList1()
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((a, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          {(currentPage - 1) * itemsPerPage + i + 1}
                        </th>
                        <td>{a.RETURN_KIND}</td>
                        <td>{a.USER_NAME}</td>
                        <td>{a.ASSETS_NAME}</td>
                        <td>{a.RETURN_TITLE}</td>
                        <td>{yyyymmdd(a.RETURN_DATE)}</td>
                        <td>
                          <button
                            type="button"
                            className="userMain-ask userMain-modalBtn"
                            onClick={() => {
                              a.RETURN_KIND === '반납'
                                ? setOpenModal_return(true)
                                : setOpenModal_exchange(true);
                              setNum(a.RETURN_NUM);
                              console.log(a.RETURN_NUM);
                            }}
                          >
                            상세보기
                          </button>
                        </td>
                        <td style={{ color: 'blue', fontWeight: '800' }}>
                          {a.RETURN_STATUS}
                        </td>
                      </tr>
                    );
                  })}

                {returnList2()
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((a, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          {(currentPage - 1) * itemsPerPage + count + i + 1}
                        </th>
                        <td>{a.RETURN_KIND}</td>
                        <td>{a.USER_NAME}</td>
                        <td>{a.ASSETS_NAME}</td>
                        <td>{a.RETURN_TITLE}</td>
                        <td>{yyyymmdd(a.RETURN_DATE)}</td>
                        <td>
                          <button
                            type="button"
                            className="userMain-ask userMain-modalBtn"
                            onClick={() => {
                              setNum(a.RETURN_NUM);
                              a.RETURN_KIND === '반납'
                                ? setOpenModal_return(true)
                                : setOpenModal_exchange(true);
                            }}
                          >
                            상세보기
                          </button>
                        </td>
                        <td style={{ color: 'darkgray' }}>{a.RETURN_STATUS}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/*  <!-- End Default Table Example --> */}
          </div>
        </div>

        {openModal_return && (
          <ReturnDetailModal_return
            setOpenModal_return={setOpenModal_return}
            num={num}
            returnList={returnList}
            getreturnList={getreturnList}
            token={token}
          />
        )}
        {openModal_exchange && (
          <ReturnDetailModal_exchange
            setOpenModal_exchange={setOpenModal_exchange}
            num={num}
            returnList={returnList}
            getreturnList={getreturnList}
            token={token}
          />
        )}

        {/* 페이징네이션 */}
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          startPage={startPage}
          endPage={endPage}
          handleClick={handleClick}
        />
      </main>
    </>
  );
}

export default ReturnExchange;
