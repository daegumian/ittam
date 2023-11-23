function ITAssetsInfo({ selectedItem }) {
  return (
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal-content">
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
          {/* 데스크탑 노트북 상세내용 */}
          {selectedItem && selectedItem.spec_cpu ? (
            <>
              <span>CPU:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_cpu}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_ram ? (
            <>
              <span>RAM:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_ram}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_mainboard ? (
            <>
              <span>MainBoard:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_mainboard}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_power ? (
            <>
              <span>Power:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_power}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_gpu ? (
            <>
              <span>GPU:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_gpu}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_hdd ? (
            <>
              <span>HDD:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_hdd}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_ssd ? (
            <>
              <span>SSD:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_ssd}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_ops ? (
            <>
              <span>운영체제:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_ops}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_mfg ? (
            <>
              <span>제조사:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_mfg}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_seriel ? (
            <>
              <span>시리얼 번호:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_seriel}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_purchase_date ? (
            <>
              <span>구매일:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_purchase_date}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.spec_warranty ? (
            <>
              <span>AS 보증기간:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.spec_warranty}
                readOnly
              />
              <br />
            </>
          ) : null}
          {/* 소프트웨어 */}
          {selectedItem && selectedItem.sw_mfg ? (
            <>
              <span>제조사:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.sw_mfg}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.sw_price ? (
            <>
              <span>가격:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.sw_price}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.sw_spec_seriel ? (
            <>
              <span>시리얼 번호:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.sw_spec_seriel}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.sw_purchase_date ? (
            <>
              <span>구매일:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.sw_purchase_date}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.sw_spec_warranty ? (
            <>
              <span>AS 보증기간:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.sw_spec_warranty}
                readOnly
              />
              <br />
            </>
          ) : null}
          {/* 기타 */}
          {selectedItem && selectedItem.etc_mfg ? (
            <>
              <span>제조사:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.etc_mfg}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.etc_price ? (
            <>
              <span>가격:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.etc_price}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.etc_purchase_date ? (
            <>
              <span>구매일:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.etc_purchase_date}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.etc_spec_warranty ? (
            <>
              <span>AS 보증기간:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.etc_spec_warranty}
                readOnly
              />
              <br />
            </>
          ) : null}
          {/* 서버 상새내용 */}
          {selectedItem && selectedItem.server_mfg ? (
            <>
              <span>제조사:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_mfg}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_capa ? (
            <>
              <span>서버 용량:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_capa}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_price ? (
            <>
              <span>가격:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_price}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_interface ? (
            <>
              <span>연결방식:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_interface}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_rpm ? (
            <>
              <span>분당회전수:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_rpm}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_average_life ? (
            <>
              <span>평균수명:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_average_life}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_datarecovery_life ? (
            <>
              <span>데이터복구 유지시간:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_datarecovery_life}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_purchase_date ? (
            <>
              <span>구매일:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_purchase_date}
                readOnly
              />
              <br />
            </>
          ) : null}
          {selectedItem && selectedItem.server_spec_warranty ? (
            <>
              <span>AS보증기간:</span>
              <input
                className="modal-body"
                style={{
                  border: '0 solid black',
                  outline: 'none',
                }}
                value={selectedItem.server_spec_warranty}
                readOnly
              />
              <br />
            </>
          ) : null}
        </div>
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

export default ITAssetsInfo;
