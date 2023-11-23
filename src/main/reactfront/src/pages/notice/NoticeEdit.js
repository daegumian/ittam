import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../styles/Style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function leftPad(value) {
  if (value >= 10) {
      return value;
  }

  return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}



function timestamp_to_date(input) {
  let d = new Date(input)
  return toStringByFormatting(d)
}


function NoticeEdit() {
  const token = localStorage.getItem("token");
  const [notice, setNotice] = useState({}); // 게시글 데이터를 저장할 상태
  const location = useLocation();

// 입력 필드의 상태를 관리하기 위한 useState
  const [editedNotice, setEditedNotice] = useState({});

// 입력 필드의 값을 변경할 때 호출되는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNotice({
      ...editedNotice,
      [name]: value,
    });
  };

  const navigation = useNavigate()
  const inputRef = useRef()
  const [imgdata, setImgData] = useState({});
  const [imageName,setImageName] = useState('')

  const handleSubmit = ()=> {
    const {files} = inputRef.current
    const formData = new FormData();
    if(files != null && files.length > 0){
      formData.append("multipartFile", files[0]);
    }
    formData.append("notice_name", editedNotice.notice_name);
    formData.append("notice_title", editedNotice.notice_title)
    formData.append("notice_content", editedNotice.notice_content);
    formData.append("notice_enddate", editedNotice.notice_enddate);
    formData.append("notice_num", location.state.notice_num);

    axios({
      url : '/noticelist/update',
      method : 'POST',
      headers: {
        'Content-Type' : 'multipart/form-data',
        Authorization : token
      },
      data: formData
    })
    .then((res) => {
      alert(res.data)
      navigation('/NoticeList')
      
    }).catch((err) => {
      alert(err)
    })
  };

  async function fetchImg(id){
        //const {data } = 
        //await axios 
        // .get(`http://localhost:9191/noticelist/detailimg/${id}?id=${id}`)
        // setImgData(data)
       try{
        const response = await axios.get(
           `/noticelist/detailimg/${id}?id=${id}`,
          //method: "get",
          {
            headers: {
            Authorization : token
          }
        }
        );
        setImgData(response.data);
      }catch (error) {
        console.error("이미지 데이터를 가져오는 중 오류 발생:", error);
      }
  }

  useEffect(()=>{
    fetchImg(location.state.notice_num)
  },[])

  useEffect(() => {
    setEditedNotice(location.state);
  }, [notice]);

      // 액시오스로 noticeImgVo 요청해서 noticeImg 담기
      const handleInputChangeImg = (e)=> {
        const {target : input} = e
        const reader = new FileReader();
        reader.onload = (e) => {
          setImgData({
            ...imgdata,
            noticeimg_path : e.target.result
          })
        }
        reader.readAsDataURL(input.files[0])

      // axios.post('http://localhost:9191/noticelist/updateimg', editedNotice)
      // .then((res) => {
      //   setImageName(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // })

      // axios({
      //   url : 'http://localhost:9191/noticelist/updateimg',
      //   method : 'POST',
      //   headers: {
      //     Authorization : token
      //   },
      //   data: editedNotice
      // }).then((res) => {
      //     setImageName(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>공지사항 수정</h1>
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
                <h5 className="card-title">글수정</h5>
                <div className="row mb-3">
                  <label htmlFor="author" className="col-sm-2 col-form-label">
                    작성자
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name="notice_name"
                      id="inputName"
                      value={editedNotice.notice_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="expirationDate"
                    className="col-sm-2 col-form-label"
                  >
                    만료일
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      name="notice_enddate"
                      id="inputEndDate"
                      value={timestamp_to_date(editedNotice.notice_enddate)}
                      onChange={handleInputChange}
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
                      name="notice_title"
                      id="inputTitle"
                      value={editedNotice.notice_title}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">
                    파일 업로드
                  </label>
                  <div class="col-sm-10">
                    <div>
                      {imgdata.noticeimg_path &&
                      <img src={imgdata.noticeimg_path} style={{width : '300px', height : '150px'}}/>
                      }
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-primary"
                      onClick={()=>inputRef.current.click()}>{imgdata.noticeimg_path ? '수정' : '추가'}</button>
                      
                        <button 
                        className="btn btn-primary"
                        onClick={()=>{
                          setImgData({
                            ...imgdata,
                            noticeimg_path : ''
                          })
                          inputRef.current.value = ""
                          }}>삭제</button>
                     </div>
                    </div>
                    <input 
                    hidden
                    ref={inputRef}
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={handleInputChangeImg}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="content" className="col-sm-2 col-form-label">
                    내용
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      name="notice_content"
                      id="inputContent"
                      style={{ height: "500px" }}
                      value={editedNotice.notice_content}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10 d-flex justify-content-end align-items-center">
                      <button
                        className="btn btn-primary writeBtn"
                        onClick={handleSubmit}
                      >
                        수정하기
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

export default NoticeEdit;
