function AssetDetailModal({ selectedItem }) {

    // console.log(selectedItem);

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
                    {selectedItem && selectedItem[17] ? (
                        <>
                            <span>CPU:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[17]} // 17은 CPU에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[18] ? (
                        <>
                            <span>RAM:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[18]} // 18은 RAM에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[19] ? (
                        <>
                            <span>MainBoard:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[19]} // 19은 MainBoard에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[20] ? (
                        <>
                            <span>Power:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[20]} // 20은 Power에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[21] ? (
                        <>
                            <span>GPU:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[21]} // 21은 GPU에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[22] ? (
                        <>
                            <span>HDD:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[22]} // 22은 HDD에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[23] ? (
                        <>
                            <span>SSD:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[23]} // 23은 SSD에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[24] ? (
                        <>
                            <span>운영체제:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[24]} // 24은 운영체제에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[25] ? (
                        <>
                            <span>제조사:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[25]} // 25은 제조사에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[26] ? (
                        <>
                            <span>시리얼 번호:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[26]} // 26은 시리얼 번호에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[27] ? (
                        <>
                            <span>구매일:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[27]} // 27은 구매일에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[28] ? (
                        <>
                            <span>AS 보증기간:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[28]} // 28은 AS 보증기간에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {/* 소프트웨어 */}
                    {selectedItem && selectedItem[8] ? (
                        <>
                            <span>제조사:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[8]} // 8은 소프트웨어 제조사에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[12] ? (
                        <>
                            <span>가격:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[12]} // 12은 소프트웨어 가격에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[9] ? (
                        <>
                            <span>시리얼 번호:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[9]} // 9은 소프트웨어 시리얼 번호에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[11] ? (
                        <>
                            <span>구매일:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[11]} // 11은 소프트웨어 구매일에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[10] ? (
                        <>
                            <span>AS 보증기간:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[10]} // 10은 소프트웨어 AS 보증기간에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {/* 기타 */}
                    {selectedItem && selectedItem[13] ? (
                        <>
                            <span>제조사:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[13]} // 13은 기타 제조사에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[16] ? (
                        <>
                            <span>가격:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[16]} // 16은 기타 가격에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[15] ? (
                        <>
                            <span>구매일:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[15]} // 15은 기타 구매일에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[14] ? (
                        <>
                            <span>AS 보증기간:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[14]} // 14은 기타 AS 보증기간에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {/* 서버 상새내용 */}
                    {selectedItem && selectedItem[26] ? (
                        <>
                            <span>제조사:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[26]} // 26은 서버 제조사에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[28] ? (
                        <>
                            <span>서버 용량:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[28]} // 28은 서버 용량에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[29] ? (
                        <>
                            <span>가격:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[29]} // 29은 서버 가격에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[31] ? (
                        <>
                            <span>연결방식:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[31]} // 31은 서버 연결방식에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[33] ? (
                        <>
                            <span>분당회전수:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[33]} // 33은 서버 분당회전수에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[32] ? (
                        <>
                            <span>평균수명:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[32]} // 32은 서버 평균수명에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[34] ? (
                        <>
                            <span>데이터복구 유지시간:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[34]} // 34은 서버 데이터복구 유지시간에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[27] ? (
                        <>
                            <span>구매일:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[27]} // 27은 서버 구매일에 해당하는 인덱스 번호
                                readOnly
                            />
                            <br />
                        </>
                    ) : null}
                    {selectedItem && selectedItem[28] ? (
                        <>
                            <span>AS보증기간:</span>
                            <input
                                className="modal-body"
                                style={{
                                    border: '0 solid black',
                                    outline: 'none',
                                }}
                                value={selectedItem[28]} // 28은 서버 AS보증기간에 해당하는 인덱스 번호
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

export default AssetDetailModal;
