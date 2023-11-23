import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import "../../styles/Style.css";
import { Link } from "react-router-dom";



const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표현하고 0으로 채움
  const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리로 표현하고 0으로 채움
  return `${year}-${month}-${day}`;
};


function NoticeDetailUser() {
  const { id } = useParams(); // 파라미터에서 id를 가져옴
  const [notice, setNotice] = useState({}); // 게시글 데이터를 저장할 상태

  const [noticeimg, setNoticeimg] = useState({}); // noticeImgVo 담을곳

  useEffect(() => {
    // 게시글 데이터를 가져오는 Axios GET 요청을 보냄
    axios
      .get(`/noticelist/detail/${id}?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


      // 액시오스로 noticeImgVo 요청해서 noticeImg 담기
      // axios.get
      axios
      .get(`/noticeUser/detailimg/${id}?id=${id}`)
      .then((res) => {
        setNoticeimg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      


  }, []);


  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>공지사항 상세페이지</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Forms</li>
            <li className="breadcrumb-item active">Elements</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">공지사항</h5>
                <form>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">
                      번호
                    </label>
                    <div className="col-sm-10">
                     {notice.notice_num}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">
                      작성자
                    </label>
                    <div className="col-sm-10">
                    {notice.notice_name}
                    </div>
                  </div>
                  <div class="row mb-3">
                  <label for="inputDate" class="col-sm-2 col-form-label">등록일</label>
                  <div class="col-sm-10">
                  {formatDate(notice.notice_regdate)}
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputDate" class="col-sm-2 col-form-label">만료일</label>
                  <div class="col-sm-10">
                  {formatDate(notice.notice_enddate)}
                  </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">
                     조회수
                    </label>
                    <div className="col-sm-10">
                    {notice.notice_hits}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">
                      제목
                    </label>
                    <div className="col-sm-10">
                    {notice.notice_title}
                    </div>
                  </div>
               <div className="row mb-3">
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                    내용
                </label>
                <p style={{ textAlign: 'center' }}>
                      <img src={noticeimg.noticeimg_path} alt="이미지" />
                </p>
              <div className="col-sm-10">
               {notice.notice_content}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/noticeuser">
                <button className="btn btn-primary">목록</button>
              </Link>
              </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NoticeDetailUser;