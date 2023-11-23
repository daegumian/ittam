function PurchaseApproval({
  handleParentChange,
  selectedParent,
  handleSelectChange,
  selectedType,
  categories,
  handleData,
  formapproval,
  purchaseSubmit,
  handleSelectChange1,
  modalClose1,
}) {
  const username = localStorage.getItem('username');
  return (
    <div className="modal fade" id="verticalycentered" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">구매요청</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form method="POST" onSubmit={purchaseSubmit}>
              <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  신청자
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    name="username"
                    value={username || ''}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  카테고리
                </label>
                <div className="col-sm-10">
                  <select onChange={handleParentChange} value={selectedParent}>
                    <option value="">선택하지않음</option>
                    {categories
                      .filter((cat) => !cat.category_parent_num)
                      .map((cat) => (
                        <option key={cat.category_num} value={cat.category_num}>
                          {cat.category_name}
                        </option>
                      ))}
                  </select>

                  <select onChange={handleSelectChange1} value={selectedType}>
                    <option value="">선택하지않음</option>
                    {categories
                      .filter(
                        (cat) =>
                          selectedParent &&
                          cat.category_parent_num === selectedParent
                      )
                      .map((cat) => (
                        <option key={cat.category_num} value={cat.category_num}>
                          {cat.category_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  제목
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="appro_title"
                    onChange={handleData}
                    value={formapproval.appro_title}
                  />
                </div>
              </div>

              <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  내용
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    style={{ height: '100px' }}
                    onChange={handleData}
                    name="appro_comment"
                    value={formapproval.appro_comment}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={modalClose1}
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

export default PurchaseApproval;
