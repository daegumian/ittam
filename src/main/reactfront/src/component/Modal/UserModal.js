import { useContext, useEffect, useState } from "react";

import { UserDispatchContext } from "../../pages/users/Users";
import { tokenInfoContext } from "../TokenInfoProvider";

const UserModal = ({ modalContent, closeModal }) => {
  const { onEdit } = useContext(UserDispatchContext);
  const { userRole } = useContext(tokenInfoContext);

  const [yearsInCompany, setYearsInCompany] = useState(null); // 년차
  const [ismodify, setIsModify] = useState(false); // 수정여부

  const [newRole, setNewRole] = useState(modalContent.role); // 선택된 권한

  useEffect(() => {
    if (modalContent.user_joindate) {
      // 현재 시간 가져오기
      const currentDate = new Date();

      // 입사일(Date 객체로 변환)
      const joinDate = new Date(modalContent.user_joindate);

      // 현재 년도와 입사일 년도 계산
      const currentYear = currentDate.getFullYear();
      const joinYear = joinDate.getFullYear();

      // 년차 계산
      const years = currentYear - joinYear;

      setYearsInCompany(years);
    }

    setNewRole(modalContent.role);
  }, [modalContent.user_joindate, modalContent.role]);

  const handleSubmit = () => {
    // 권한을 변경하면 onEdit 호출
    if (newRole !== modalContent.role) {
      if (window.confirm("권한을 변경하시겠습니까?")) {
        onEdit(modalContent.username, newRole);
      }
      setIsModify(false);
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
                setIsModify(false);
              }} // 모달 닫기 함수 호출
            ></button>
          </div>
          <div className="modal-body">
            <p>사원 번호 : {modalContent.username}</p>
            <p>소속 부서 : {modalContent.user_depart}</p>
            {ismodify ? (
              <div className="role-control-wrapper">
                <p>사용자 권한 : </p>
                <select
                  className="role-select"
                  id="selectrole"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value={"ROLE_USER"}>사용자</option>
                  <option value={"ROLE_ADMIN"}>관리자</option>
                </select>
              </div>
            ) : (
              <p>
                사용자 권한 : {newRole === "ROLE_USER" ? "사용자" : "관리자"}
              </p>
            )}
            <p>이메일 : {modalContent.user_email}</p>
            <p>연락처 : {modalContent.user_phone}</p>
            <p>주소 : {modalContent.user_address}</p>
            <p>
              입사일 : {modalContent.user_joindate} ({yearsInCompany + 1}년차)
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                closeModal();
                setIsModify(false);
              }} // 모달 닫기 함수 호출
            >
              닫기
            </button>
            {userRole === "ROLE_HIGH_ADMIN" && ismodify ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit();
                  setIsModify(false);
                }}
              >
                변경 완료
              </button>
            ) : userRole === "ROLE_HIGH_ADMIN" ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsModify(true);
                }}
              >
                권한 변경
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
