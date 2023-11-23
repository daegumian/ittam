import React, { useEffect, useState, useContext  } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/Style.css";
import "../../styles/NoticeDetail.css";
import { tokenInfoContext } from "../../component/TokenInfoProvider";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표현하고 0으로 채움
  const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리로 표현하고 0으로 채움
  return `${year}-${month}-${day}`;
};

function NoticeDetail() {
  const token = localStorage.getItem("token");
  const { userRole, username, handleChange } = useContext(tokenInfoContext);

  const { id } = useParams(); // 파라미터에서 id를 가져옴
  const [notice, setNotice] = useState({}); // 게시글 데이터를 저장할 상태

  const [noticeimg, setNoticeimg] = useState({}); // noticeImgVo 담을곳

  //const location = useLocation();
  const navigate = useNavigate();

  const click_on_edit = () => {
    console.log("called");
    navigate(`/NoticeEdit`, { state: notice});
  };


  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      // axios
      //   .post(`http://localhost:9191/noticelist/delete`,notice)
      //   .then((res) => {
      //     // console.log(1);
      //     // alert(res.data);
      //     // navigate(`/noticelist`);
      //   })
      //   .catch((err) => {
      //     // alert(err);
      //   });

      axios({
        url: "/noticelist/delete",
        method: "post",
        headers: {
          Authorization : token
        },
        data: notice
      }).then((res) => {
        // console.log(1);
        // alert(res.data);
        // navigate(`/noticelist`);
      })
          .catch((err) => {
             alert(err);
          });

        // axios
        // .post(`http://localhost:9191/noticelist/deleteimg`,{
        //   notice_num2 : notice.notice_num
        // })
        // .then((res) => {
        //   console.log(1);
        //   alert(res.data);
        //   navigate(`/noticelist`);
        // })
        // .catch((err) => {
        //   alert(err);
        // });

        axios({
          url: "/noticelist/deleteimg",
          method: "post",
          headers: {
            Authorization : token
          },
          data: {
            notice_num2 : notice.notice_num
          }
        }).then((res) => {
          console.log(1);
          alert(res.data);
          navigate(`/noticelist`);
        })
        .catch((err) => {
          alert(err);
        });
    }};


  useEffect(() => {
    // 게시글 데이터를 가져오는 Axios GET 요청을 보냄
    // axios
    //   .get(`http://localhost:9191/noticelist/detail/${id}?id=${id}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setNotice(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
      axios({
        url: `/noticelist/detail/${id}?id=${id}`,
        method: "get",
        headers: {
          Authorization : token
        }
      }).then((res) => {
        console.log(res.data);
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


      // 액시오스로 noticeImgVo 요청해서 noticeImg 담기
      // axios.get
      // axios
      // .get(`http://localhost:9191/noticelist/detailimg/${id}?id=${id}`)
      // .then((res) => {
      //   setNoticeimg(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      
      axios({
        url: `/noticelist/detailimg/${id}?id=${id}`,
        method: "get",
        headers: {
          Authorization : token
        }
      })
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
                 

                {/* <div className="row mb-3 notice_title">
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                    >
                      <p>제목</p>
                    </label>
                    <div className="col-sm-10">{notice.notice_title}</div>
                  </div>



                  <div className="row mb-3 notice_name">
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                    >
                      <p>작성자</p>
                    </label>
                    <div className="col-sm-10">{notice.notice_name}</div>
                  </div>

                  
                  <div className="row mb-3 notice_num" style={{display : "none"}}>
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                    >
                      <p>번호</p>
                    </label>
                    <div className="col-sm-10">{notice.notice_num}</div>
                  </div>



                  <div className="row mb-3 notice_hit">
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                    >
                      <p>조회수</p>
                    </label>
                    <div className="col-sm-10">{notice.notice_hits}</div>
                  </div>                



                  <div class="row mb-3 notice_rag">
                    <label for="inputDate" className="col-sm-2 col-form-label">
                      <p>등록일</p>
                    </label>
                    <div className="col-sm-10">{formatDate(notice.notice_regdate)}</div>
                  </div>



                  <div className="row mb-3 notice_end">
                    <label for="inputDate" className="col-sm-2 col-form-label">
                      <p>만료일</p>
                    </label>
                    <div className="col-sm-10">{formatDate(notice.notice_enddate)}</div>
                  </div>



                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label">
                      내용 
                    </label>
                    {noticeimg && 
                    <p style={{ textAlign: 'center' }}>
                      <img src={noticeimg.noticeimg_path} alt="이미지" style={{ maxWidth: '500px', width: '100%', height: 'auto' }}/>
                    </p>
                    }
                    <div className="col-sm-10" style={{ textAlign: 'center' }}>{notice.notice_content}</div>
                  </div> */}


                <div style={{fontSize: "24px", marginBottom : '30px'}}>{notice.notice_title}</div>
                 
               
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,paddingBottom : '10px',borderBottom: '1px solid #dbdbdb'}}>
                  <span style={{ textAlign: 'left' }}>{notice.notice_name}</span>
                  <div>
                    <span style={{ marginLeft: '10px' }}>등록일 {formatDate(notice.notice_regdate)}</span>
                    <span style={{ marginLeft: '10px' }}>만료일 {formatDate(notice.notice_enddate)}</span>
                    <span style={{ marginLeft: '10px' }}>조회수 {notice.notice_hits}</span>
                  </div>
                </div>

                  <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                      >
                    </label>
                    {noticeimg && 
                    <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                      <img src={noticeimg.noticeimg_path} alt="이미지" style={{ maxWidth: '500px', width: '100%', height: 'auto' }}/>
                    </p>
                    }
                   <div style={{ textAlign: 'left', marginBottom: '30px', whiteSpace: 'pre-line' }}>
                    {notice.notice_content}
                  </div>




                    {userRole == 'ROLE_USER' && (
                   <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ><Link to="/noticeuser">
                  <button className="btn btn-primary listBtn" type="button" style={{ marginRight: "10px" }}>
                  목록
                  </button>
                  </Link>
                  </div>
                    )} 


                {userRole == 'ROLE_ADMIN' &&  (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="btn btn-primary writeBtn"
                      type="button"
                      style={{ marginRight: "10px" }}
                      onClick={click_on_edit}
                    >
                      수정
                    </button>
                    <Link to="/noticelist">
                    <button className="btn btn-primary listBtn" type="button" style={{ marginRight: "10px" }}>
                    목록
                    </button>
                    </Link>
                    <button className="btn btn-primary deleteBtn" type="button" onClick={handleDelete}>
                      삭제
                    </button>
                  </div> )}

                  {userRole == 'ROLE_HIGH_ADMIN' &&  (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="btn btn-primary writeBtn"
                      type="button"
                      style={{ marginRight: "10px" }}
                      onClick={click_on_edit}
                    >
                      수정
                    </button>
                    <Link to="/noticelist">
                    <button className="btn btn-primary listBtn" type="button" style={{ marginRight: "10px" }}>
                    목록
                    </button>
                    </Link>
                    <button className="btn btn-primary deleteBtn" type="button" onClick={handleDelete}>
                      삭제
                    </button>
                  </div> )}







                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NoticeDetail;
