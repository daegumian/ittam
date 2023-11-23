import { useState } from "react";
// import "./ApproveList.css";


function Approve() {
  const [innerData, setInnerDate] = useState({
    prodInnerName : "",
    prodInnerCount : "",
    userInnerName : ""
  });

  const handleToggle = (e) => {
    let basicModal = document.getElementById("basicModal");
    basicModal.classList.toggle("show");
    basicModal.style.display = ((basicModal.style.display !== 'none') ? 'none' : 'block'); 
    setInnerDate({
      ...innerData,
      prodInnerName : e.target.closest(".prod-box").querySelector(".prodName").textContent,
      prodInnerCount : e.target.closest(".prod-box").querySelector(".prodCount").textContent,
      userInnerName : e.target.closest(".prod-box").querySelector(".userName").textContent
    });



   };
  
  const handleBackToggle = (e) => {
    let basicModalBack = document.getElementById("basicModalBack");
    basicModalBack.classList.toggle("show");
    basicModalBack.style.display = ((basicModalBack.style.display !== 'none') ? 'none' : 'block');  
    setInnerDate({
      ...innerData,
      prodInnerName : e.target.closest(".prod-box").querySelector(".prodName").textContent,
      prodInnerCount : e.target.closest(".prod-box").querySelector(".prodCount").textContent,
      userInnerName : e.target.closest(".prod-box").querySelector(".userName").textContent
    });
  

  };

  const handleClose =() =>  {
    let basicModal = document.getElementById("basicModal");
    basicModal.style.display = "none";
    basicModal.classList.toggle("show");
  };
  const handleBackClose = () => {
    let basicModalBack = document.getElementById("basicModalBack");
    basicModalBack.style.display = "none";
    basicModalBack.classList.toggle("show");
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>자산 신청내역 조회/처리</h1>
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
                  <h5 className="card-title">자산 사용 신청내역 조회</h5>
                  <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                    <div className="datatable-top">
                      <div className="datatable-dropdown">
                        <label htmlFor="">
                          <select className="datatable-selector">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                          </select>
                        </label>
                      </div>
                      <div className="datatable-search">
                        <input
                          className="datatable-input"
                          placeholder="검색"
                          type="search"
                          title="Search within table"
                        />
                      </div>
                    </div>
                  </div>
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            #
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
                            신청날짜
                          </a>
                        </th>
                        
                        <th data-sortable="true" className="handle">
                          <a href="#" className="datatable-sorter">
                            승인
                          </a>
                        </th>
                        <th data-sortable="true" className="handle">
                          <a href="#" className="datatable-sorter">
                            반려
                          </a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="prod-box">
                        <th scope="row">1</th>
                        <td className="userName">찬한</td>
                        <td className="prodName">맥북</td>
                        <td className="prodCount">28</td>
                        <td className="prodRegDate">1995-07-10</td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleToggle} >승인</button>
                        </td>
                        <td className="handle">
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleBackToggle}>반려</button>
                        </td>
                      </tr>
                      <tr className="prod-box">
                        <th scope="row">2</th>
                        <td className="userName">성욱</td>
                        <td className="prodName">레노버</td>
                        <td className="prodCount">35</td>
                        <td className="prodRegDate">2014-12-05</td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleToggle} >승인</button>
                        </td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleBackToggle}>반려</button>
                        </td>
                      </tr>
                      <tr className="prod-box">
                        <th scope="row">3</th>
                        <td className="userName">동훈</td>
                        <td className="prodName">삼성키보드</td>
                        <td className="prodCount">45</td>
                        <td className="prodRegDate">2011-08-12</td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleToggle} >승인</button>
                        </td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleBackToggle}>반려</button>
                        </td>
                      </tr>
                      <tr className="prod-box">
                        <th scope="row">4</th>
                        <td className="userName">지유</td>
                        <td className="prodName">인텔리제이</td>
                        <td className="prodCount">34</td>
                        <td className="prodRegDate">2012-06-11</td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleToggle} >승인</button>
                        </td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleBackToggle}>반려</button>
                        </td>
                      </tr>
                      <tr className="prod-box">
                        <th scope="row">5</th>
                        <td className="userName">재영</td>
                        <td className="prodName">키보드</td>
                        <td className="prodCount">47</td>
                        <td className="prodRegDate">2011-04-19</td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleToggle} >승인</button>
                        </td>
                        <td>
                        <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleBackToggle}>반려</button>
                        </td>
                      </tr>
                      <tr className="prod-box">
                        <th scope="row">6</th>
                        <td className="userName">가영</td>
                        <td className="prodName">바비인형</td>
                        <td className="prodCount">47</td>
                        <td className="prodRegDate">2011-04-19</td>
                        <td>
                          <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleToggle} >승인</button>
                        </td>
                        <td>
                          <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={handleBackToggle}>반려</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="modal fade" id="basicModal" tabIndex="-1" style={{display : "none"}} 
      aria-modal="true"  role="dialog" >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">승인 확인</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                      <p>신청자명 : {innerData.userInnerName}</p>
                      <p>자산명 : {innerData.prodInnerName}</p>
                      <p>수량 : {innerData.prodInnerCount}개</p>
                      해당 자산 사용신청을 승인처리 하시겠습니까?
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>취소</button>
                      <button type="button" className="btn btn-primary" onClick={handleClose}>승인</button>
                     
                    </div>
                  </div>
                </div>
      </div>

      <div className="modal fade" id="basicModalBack" tabIndex="-1" style={{display : "none"}} 
      aria-modal="true" role="dialog" >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" >반려 확인</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleBackClose}></button>
                    </div>
                    <div className="modal-body">
                      <p>신청자명 : {innerData.userInnerName}</p>
                      <p>자산명 : {innerData.prodInnerName}</p>
                      <p>수량 : {innerData.prodInnerCount}개</p>
                      해당 자산 사용신청을 반려 처리하시겠습니까?
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleBackClose}>취소</button>
                      <button type="button" className="btn btn-primary" onClick={handleBackClose}>반려</button>
                     
                    </div>
                  </div>
                </div>
      </div>
    </div>
  );
}
export default Approve;
