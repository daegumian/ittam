import "../../styles/Style.css";
import "../../styles/MainPageStyle/ReturnDetailModal.css";
import axios from "axios";
import {useEffect, useState} from "react";

function ReturnDetailModal({ setOpenModal_exchange, num, returnList, getreturnList, token }) {

    const [mustChoice, setMustChoice] = useState("선택하기");


  let thisList = () => {
    return returnList.find(x => x.RETURN_NUM == num)
  }


  const reqTime = () => {
    let now = new Date(thisList().RETURN_DATE);
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + dayOfWeek + " " +  hours + "시 " + minutes + "분";
  }

  const [selectAssetList, setSelectAssestList] = useState([]);
  const getSelectAssetList = (category_num) => {

    axios({
        url: "/mainPage/getSelectAssetList",
        method: "get",
        headers: {
            Authorization : token
        },
        params: {
            category_num: category_num
        }
    })  .then(response => {setSelectAssestList(response.data); console.log(response.data)})
        .catch(error => console.log(error))
  }



  const exchangeAsset = (return_status) => {
    const exchangeForm = {
      assets_num_now: thisList().ASSETS_NUM,
      assets_num_later: mustChoice.split(",")[0],
      assets_detail_name_later: mustChoice.split(",")[1],
      username : thisList().username,
      return_num: thisList().RETURN_NUM,
      return_status: return_status,
      assets_name: thisList().ASSETS_NAME,
      assets_detail_name: thisList().ASSETS_DETAIL_NAME
    }


  axios({
      url: "/mainPage/exchangeAsset",
      method: "post",
      headers: {
          Authorization : token
      },
      data: exchangeForm
  }).then(response => {
      alert("교환승인이 완료되었습니다");
      console.log(response.data);
      setOpenModal_exchange(false);
      getreturnList();

  }).catch(error => {
      console.log(error);
  })

  }

  const cancelExchange = (return_status) => {

    axios({
        url: "/mainPage/cancelExchange",
        method: "post",
        headers: {
            Authorization : token
        },
        data: {
            username : thisList().username,
            return_status: return_status,
            return_num: thisList().RETURN_NUM,
            assets_name: thisList().ASSETS_NAME,
            assets_detail_name: thisList().ASSETS_DETAIL_NAME

        }
    })
        .then(response => {
            console.log(response.data);
            alert('반려처리되었습니다.');
            setOpenModal_exchange(false);
            getreturnList();
        })
        .catch(error => console.log(error));
  }


  useEffect(() => {

    getSelectAssetList(thisList().CATEGORY_NUM);
  }, []);



  return (


    <div className="modal modalmodal" onClick={() => { setOpenModal_exchange(false);}}>
      
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>

        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal_exchange(false);
            }}
          >
          
            X
          </button>
        </div>
        <div className="title">
          <h5>상세정보</h5>
            <hr/>
        </div>
        <div className="body">


            <div className="row mb-3">
              <label htmlFor="" className="col-sm-2 col-form-label">신청자산</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" value={`${thisList().ASSETS_NAME}|${thisList().ASSETS_DETAIL_NAME}`} disabled />

              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-2 col-form-label">교환자산</label>
              <div className="col-sm-10">
                  {
                      thisList().RETURN_STATUS==='승인대기' ?

                <select name="" id="mustChoice"  className="select-assets" onChange={(e) => {setMustChoice(e.target.value);}}>
                  <option value="선택하기">선택하기</option>
                  {
                    selectAssetList.map((a, i) => {
                          return <option key={i} value={`${a.ASSETS_NUM},${a.ASSETS_DETAIL_NAME}`}>{a.ASSETS_NAME}|{a.ASSETS_DETAIL_NAME}</option>
                    }

                    )
                  }
                </select>
                          :
                          <input type="text" className="form-control" value={`${thisList().ASSETS_NAME} | ${thisList().RETURN_ASSETS_DETAIL_NAME}`} disabled />
                  }

              </div>
            </div>



            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">신청자</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" value={thisList().USER_NAME} disabled />

              </div>
            </div>
            <div className="row mb-3">
              <label for="inputText" className="col-sm-2 col-form-label">신청날짜</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" value={reqTime()} disabled />
              </div>
            </div>

            <div className="row mb-3 position-relative">
              <label for="validationTooltip03" className="col-sm-2 col-form-label">신청제목</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="return_title" id="validationTooltip01" value={thisList().RETURN_TITLE} disabled/>
                <div className="invalid-tooltip">
                  Please provide a valid city.
                </div>
              </div>
            </div>


            <div className="row mb-3">
              <label for="inputText" className="col-sm-2 col-form-label">신청사유</label>
              <div className="col-sm-10">
                <textarea className="form-control userModalAst-text" name="return_comment" disabled>{thisList().RETURN_COMMENT}</textarea>
              </div>
            </div>



        </div>
        <div className="footer">
            {
                thisList().RETURN_STATUS==='승인대기'?
                    <>
          <button onClick={() => {mustChoice!=='선택하기' ? exchangeAsset('승인') : alert('교환할 자산을 선택하세요')}} id="cancelBtn">승인</button>
          <button onClick={() => cancelExchange('반려')}>반려</button>
                    </>
                : <button style={{backgroundColor: 'gray'}} disabled>{thisList().RETURN_STATUS}처리</button>

            }
        </div>
      </div>
    </div>

   

  )
}
export default ReturnDetailModal;
