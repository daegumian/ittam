function ApprovalComment({ info }) {
  return (
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal-content" style={{ width: '600px' }}>
        <div className="modal-header">
          <h5 className="modal-title">상세내용</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <span>제목:</span>
          <input
            style={{
              border: '0 solid black',
              outline: 'none',
            }}
            value={info ? info.appro_title : ''}
            readOnly
          />
          <br />
          <br />
          <span>내용:</span>
          <input
            style={{
              border: '0 solid black',
              outline: 'none',
              width: '500px',
            }}
            value={info ? info.appro_comment : ''}
            readOnly
          />
        </div>
        <br />
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApprovalComment;
