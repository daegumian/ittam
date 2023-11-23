import { useContext, useEffect, useState } from "react";

import { UserDispatchContext } from "../../pages/users/Users";

const UserLeaveModal = ({ modalContent, closeModal }) => {
  const { onRemove } = useContext(UserDispatchContext);

  const handleSubmit = async () => {
    if (
      window.confirm(
        "퇴사 처리하시겠습니까? 해당 사용자와 관련된 정보가 모두 삭제됩니다"
      )
    ) {
      await onRemove(modalContent.username);
      closeModal();
    }
  };

  return (
    <div className="modal fade" id="userModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="userModalLabel">
              사원명 : {modalContent.user_name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                closeModal();
              }} // 모달 닫기 함수 호출
            ></button>
          </div>
          <div className="modal-body">
            <p>사원 번호 : {modalContent.username}</p>
            <p>소속 부서 : {modalContent.user_depart}</p>
            <p>연락처 : {modalContent.user_phone}</p>
            <p>이메일 : {modalContent.user_email}</p>
            <p>퇴사 신청 일자 : {modalContent.user_leavedate}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                closeModal();
              }} // 모달 닫기 함수 호출
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              퇴사 처리
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLeaveModal;
