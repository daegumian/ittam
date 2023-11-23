import "../../styles/Style.css";
import "../../styles/MainPageStyle/ReturnDetailModal.css";
import axios from "axios";

function ReturnDetailModal_return({ setOpenModal_return, num, returnList, getreturnList, token }) {

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

  const updateReturn_yn = (return_status) => {

    axios({
      url: "/mainPage/updateReturn_yn",
      method: "post",
      headers: {
        Authorization : token
      },
      data: {
        return_status: return_status,
        return_num: thisList().RETURN_NUM,
        assets_num: thisList().ASSETS_NUM,
        assets_name: thisList().ASSETS_NAME,
        assets_detail_name: thisList().ASSETS_DETAIL_NAME,
        username: thisList().username
      }
    }).then(response => {console.log(response.data); getreturnList();})
        .catch(error => console.log(error));
  }


  return (

    <div className="modal modalmodal" onClick={() => { setOpenModal_return(false);}}>
      
      <div className="modalContainer" onClick={(e) => e.stopPropagation()} style={{height: "550px"}}>

        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal_return(false);
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
                <input type="text" className="form-control" value={thisList().ASSETS_NAME} disabled />

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
            thisList().RETURN_STATUS==='승인대기' ?
                <>
                <button onClick={() => { alert('승인처리되었습니다'); setOpenModal_return(false); updateReturn_yn('승인')}} id="cancelBtn">승인</button>
                </>
              : <button style={{backgroundColor: 'gray'}} disabled>{thisList().RETURN_STATUS}처리</button>
        }
        </div>

      </div>
    </div>

   

  )
}
export default ReturnDetailModal_return;
