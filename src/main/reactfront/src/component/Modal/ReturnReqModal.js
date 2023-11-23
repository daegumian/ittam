import "../../styles/Style.css";
import "../../styles/MainPageStyle/ReturnDetailModal.css";

function ReturnReqModal({
  setOpenModal,
  handleChange,
  handleSubmit,
  todayTime,
  inputTitle,
  setInputTitle,
  inputComment,
  setInputComment,
  myAssetList,
  myAssetNum,
  username,
  myInfo
}) {
  let thisList = () => {
    return myAssetList.find((x) => x.ASSETS_NUM == myAssetNum);
  };

  return (
    <div
      className="modal modalmodal"
      onClick={(e) => {
        setOpenModal(false);
        setInputTitle("");
        setInputComment("");
      }}
    >
      <div
        className="card"
        style={{ width: "600px", borderRadius: "8px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "0px" }}>
            교환 및 반납 신청
          </h5>
          <hr />

          <form
            method="post"
            onSubmit={(e) => handleSubmit(e, thisList().ASSETS_NUM)}
          >
            <fieldset className="row mb-3">
              <legend className="col-form-label col-sm-2 pt-0">요청종류</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="return_kind"
                    id="gridRadios1"
                    value="교환"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    교환
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="return_kind"
                    id="gridRadios2"
                    onChange={handleChange}
                    value="반납"
                  />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    반납
                  </label>
                </div>
              </div>
            </fieldset>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-2 col-form-label">
                신청자산
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={thisList().ASSETS_NAME}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">신청자</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={myInfo.user_name}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <label for="inputText" className="col-sm-2 col-form-label">
                신청날짜
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  value={todayTime()}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-3 position-relative">
              <label
                for="validationTooltip03"
                className="col-sm-2 col-form-label needs-validation"
                novalidate
              >
                신청제목
              </label>
              <div className="col-sm-10">
                {/*<input type="text" className="form-control" name="return_title"  id="validationTooltip01"  onChange={handleChange} value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} required/>*/}
                <input
                  type="text"
                  className="form-control"
                  name="return_title"
                  id="validationTooltip01"
                  onChange={handleChange}
                  value={inputTitle}
                  required
                />
                <div className="invalid-tooltip">
                  Please provide a valid city.
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label for="inputText" className="col-sm-2 col-form-label">
                신청사유
              </label>
              <div className="col-sm-10">
                {/*<textarea className="form-control userModalAst-text" name="return_comment" onChange={handleChange} value={inputComment} onChange={(e) => setInputComment(e.target.value)} required></textarea>*/}
                <textarea
                  className="form-control userModalAst-text"
                  name="return_comment"
                  onChange={handleChange}
                  value={inputComment}
                  required
                ></textarea>
              </div>
            </div>

            <div className="row mb-3 userModalAsk-btn">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    marginRight: "10px",
                    backgroundColor: "gray",
                    border: "gray",
                  }}
                  onClick={() => {
                    setInputTitle("");
                    setInputComment("");
                    setOpenModal(false);
                  }}
                >
                  뒤로가기
                </button>

                <button type="submit" className="btn btn-primary">
                  신청하기
                </button>
              </div>
            </div>
          </form>
          {/* <!-- End General Form Elements --> */}
        </div>
      </div>

      {/* </div> */}

      {/* </div> */}
    </div>
  );
}
export default ReturnReqModal;
