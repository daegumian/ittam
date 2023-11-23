import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../styles/Style.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLCP } from "web-vitals";

function NoticeWrite() {

  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  

  const handleSubmit =  () => {
    let inputName = document.getElementById("inputName");
    let inputTitle = document.getElementById("inputTitle");
    let inputContent = document.getElementById("inputContent");
    let inputEndDate = document.getElementById("inputEndDate");
    let formFile = document.getElementById("formFile");

    const formData = new FormData();
    if(formFile.files != null && formFile.files.length > 0){
      formData.append("multipartFile", formFile.files[0]);
    }
    formData.append("notice_name", inputName.value);
    formData.append("notice_title", inputTitle.value);
    formData.append("notice_content", inputContent.value);
    formData.append("notice_enddate", inputEndDate.value);

   if (!inputEndDate.value) {
      alert("공지 종료일을 입력해주세요.");
      return;
  
    }
    
    // formData.append("notice_enddate", inputEndDate.value);
    // alert("게시글 등록에 성공했습니다.");
    // navigate("/noticelist");

    axios({
      url: '/noticelist/write',
      method: 'post',
      headers: {
       'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      data: formData,
    })
        .then((response) => {
          console.log(1);
          console.log(response);
          alert("게시글이 작성되었습니다.");
          navigate("/NoticeList");

        })
        .catch((error) => {
          console.log(error);
          alert("글 게시중 오류가 발생했습니다.");
        });

  };

  useEffect(() => {
    
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>공지사항 작성</h1>
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
                <h5 className="card-title">글작성</h5>
                  <div className="row mb-3">
                    <label htmlFor="author" className="col-sm-2 col-form-label">
                      작성자
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="author"
                        id="inputName"
                        value={"관리자"}
                        readOnly disabled
                      />
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <label htmlFor="expirationDate" className="col-sm-2 col-form-label">
                      만료일
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="date"
                        className="form-control"
                        name="expirationDate"
                        id="inputEndDate"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                      제목
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        id="inputTitle"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                  <label htmlFor="inputNumber" class="col-sm-2 col-form-label">파일 업로드</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="file" id="formFile"/>
                  </div>
                </div>
                  <div className="row mb-3">
                    <label htmlFor="content" className="col-sm-2 col-form-label">
                      내용
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        name="content"
                        id="inputContent"
                        style={{ height: "500px" }}
                      />
                    </div>
                  </div>
                <div className="row mb-3">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10 d-flex justify-content-end align-items-center">
                   <button className="btn btn-primary writeBtn" onClick={handleSubmit}>
                   등록하기
                   </button>
                  </div>
                  </div>
                </div>  
            </div>
          </div>
        </div>
      </section>
    </main>
  );
  }


export default NoticeWrite;