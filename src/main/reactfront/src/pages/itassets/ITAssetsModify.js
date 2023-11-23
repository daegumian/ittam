function ITAssetsModify({
  selectedItem,
  updateSubmit,
  handleStatus,
  assetstatus,
  statusReset,
  appro,
  formStatus,
}) {
  const username = localStorage.getItem('username');
  return (
    <div className="modal fade" id="basicModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">폐기/수리요청</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form method="POST" onSubmit={updateSubmit}>
              <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  제목
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="appro_title"
                    onChange={appro}
                    value={formStatus.appro_title}
                  />
                </div>
              </div>

              <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  수리/폐기
                </label>
                <div className="col-sm-10">
                  <select
                    name="assets_status"
                    onChange={handleStatus}
                    value={assetstatus}
                  >
                    <option value="">선택하지않음</option>
                    <option value="수리">수리</option>
                    <option value="폐기">폐기</option>
                  </select>
                </div>
              </div>

              {/* <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  신청자
                </label> */}
              <div className="col-sm-10">
                <input
                  type="hidden"
                  className="form-control"
                  placeholder="username"
                  name="username"
                  value={username || ''}
                />
              </div>
              {/* </div> */}

              <div className="row mb-3">
                <label
                  htmlFor="appro_comment"
                  className="col-sm-2 col-form-label"
                >
                  내용
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    style={{ height: '100px' }}
                    onChange={appro}
                    name="appro_comment"
                    value={formStatus.appro_comment}
                  />
                </div>
              </div>

              <div className="col-sm-10">
                <input
                  type="hidden"
                  className="form-control"
                  placeholder="assets_num"
                  name="assets_num"
                  value={selectedItem ? selectedItem.assets_num : ''}
                  readOnly
                />
              </div>

              <div className="col-sm-10">
                <input
                  type="hidden"
                  className="form-control"
                  placeholder="category_num"
                  name="category_num"
                  value={selectedItem ? selectedItem.category_num : ''}
                  readOnly
                />
              </div>

              {/* <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  자산이름
                </label> */}
              <div className="col-sm-10">
                <input
                  type="hidden"
                  className="form-control"
                  placeholder="assets_name"
                  name="assets_name"
                  value={
                    selectedItem
                      ? selectedItem.assets_name +
                        ' ' +
                        selectedItem.assets_detail_name
                      : ''
                  }
                  readOnly
                />
              </div>
              {/* </div> */}

              <div className="col-sm-10">
                <input
                  type="hidden"
                  className="form-control"
                  placeholder="spec_num"
                  name="spec_num"
                  value={selectedItem ? selectedItem.spec_num : ''}
                  readOnly
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={statusReset}
                >
                  닫기
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  요청
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ITAssetsModify;
