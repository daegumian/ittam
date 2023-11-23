import "../../styles/Style.css";
import "../../styles/MainPageStyle/ReturnDetailModal.css";
import axios from "axios";

function LeaveModal({ setOpenLeaveModal, username, getUserInfo, token }) {
  const registLeaveReq = (e, username) => {
    e.stopPropagation();

    axios({
      url: "/mainPage/registLeaveReq",
      method: "get",
      headers: {
        Authorization : token
      },
      params: {
        username: username
      }
    }).then((response) => console.log(response.data))
        .catch((error) => console.log(error));

    setOpenLeaveModal(false);
    getUserInfo(username);
    window.location.href = "/myPage";

  };

  return (
    <div className="modal modalmodal">
      <div className="card" style={{ width: "600px", borderRadius: "8px" }}>
        <div className="card-body">
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 style={{fontSize: '30px', fontWeight: '600', color: 'red'}}>퇴사신청을 하시겠습니까?</h1>
            <p>퇴사신청 후에는 취소가 되지 않으며 <br/> 취소 시에는 관리자에게 직접 문의바랍니다.</p>
          </div>

          <div
            className="row mb-3 userModalAsk-btn"
            style={{ marginRight: "90px" }}
          >
            <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ marginRight: "20px" }}
                onClick={() => {
                  setOpenLeaveModal(false);
                }}
              >
                뒤로가기
              </button>

              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={(e) => registLeaveReq(e, username)}
              >
                퇴사요청
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeaveModal;
