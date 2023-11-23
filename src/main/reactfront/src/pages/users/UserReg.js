import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DepartItem from '../../component/DepartItem';

// 부서 리스트 유틸
import { departList } from '../../constants/Depart';
import { getStringDate } from '../../hooks/Date';
import { UserDispatchContext } from './Users';
import { tokenInfoContext } from '../../component/TokenInfoProvider';

const UserReg = () => {
  const { userRole } = useContext(tokenInfoContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole !== 'ROLE_ADMIN' && userRole !== 'ROLE_HIGH_ADMIN') {
      if (userRole === 'ROLE_USER') {
        navigate('/user/userMain');
      } else if (userRole === 'ROLE_ADMIN') {
        navigate('/admin/adminMain');
      } else if (userRole === 'ROLE_HIGH_ADMIN') {
        navigate('/highadmin/highAdminMain');
      } else if (userRole === 'none') {
        navigate('/');
      }
    }
  }, []);
  const makeIdBtn = useRef();

  const { onCreate } = useContext(UserDispatchContext);

  // 새로 작성된 state
  const [content, setContent] = useState({
    username: '',
    password: '',
    user_name: '',
    user_email: '',
    user_depart: '',
    user_phone: '',
    user_address: '',
    role: '',
    user_joindate: '',
  });

  // 부서 정렬
  const getSortedDepartList = () => {
    // 비교 함수
    const compare = (a, b) => {
      if (a.depart_descript < b.depart_descript) {
        return -1;
      }
      if (a.depart_descript > b.depart_descript) {
        return 1;
      }
      return 0;
    };

    const copyDepart = JSON.parse(JSON.stringify(departList));

    const sortDepart = copyDepart.sort(compare);
    return sortDepart;
  };

  // 뒤로가기
  const handleCancelClick = () => {
    navigate('/users/userList', { replace: true }); // '/users/userList' 경로로 이동
  };

  //////////////useRef
  const refs = {
    userName: useRef(null),
    userDepart: useRef(null),
    joinDate: useRef(null),
    userAuth: useRef(null),
    firstPhone: useRef(null),
    secondPhone: useRef(null),
    userEmail: useRef(null),
    userDomain: useRef(null),
    userAddr: useRef(null),
  };

  // 각 input 태그를 하나로 관리
  const [state, setState] = useState({
    name: '',
    depart: '',
    date: getStringDate(new Date()),
    auth: '',
    firstPhoneInput: '',
    secondPhoneInput: '',
    email: '',
    selectedDomain: '',
    address: '',
    userId: '',
  });

  // state 변환 함수 전체 관리
  const handleChangeState = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  // input 태그 자동 이동 ( 전화 번호 )
  useEffect(() => {
    if (state.firstPhoneInput.length === 4) {
      refs.secondPhone.current.focus();
    }
  }, [state.firstPhoneInput, state.secondPhoneInput]);

  // 사원번호 생성 버튼 활성화 조건
  useEffect(() => {
    if (
      state.name !== '' &&
      state.depart !== 0 &&
      state.secondPhoneInput.length === 4
    ) {
      // 조건 만족시, 버튼 변경
      makeIdBtn.current.className = 'btn btn-primary';
    } else {
      makeIdBtn.current.className = 'btn btn-secondary disabled';
    }
  }, [state.name, state.depart, state.date, state.secondPhoneInput]);

  // 사원 번호 생성 함수
  const updateUserId = () => {
    const randomTwoNumber = Math.floor(Math.random() * 100);

    // 부서
    const selectedDepart = departList.find(
      (it) => parseInt(it.depart_id) === parseInt(state.depart)
    );
    // 입사일 을 아이디 생성위해 자름
    const subDate = state.date.replaceAll('-', '').slice(4, 9);

    const userId = `${selectedDepart.depart_short}${subDate}${state.secondPhoneInput}${randomTwoNumber}`;
    setState({ ...state, userId: userId });
  };

  const isUserIdValid = () => {
    return state.userId.trim() !== '';
  };

  const isUserNameValid = () => {
    return state.name.trim() !== '';
  };

  const isPhoneInputValid = () => {
    return (
      state.firstPhoneInput.length === 4 && state.secondPhoneInput.length === 4
    );
  };

  const isUserDepartValid = () => {
    return state.depart !== 0;
  };

  const isEmailValid = () => {
    return state.email.length !== 0;
  };

  const isAddressValid = () => {
    return state.address.length !== 0;
  };

  const validCheck = () => {
    return (
      isAddressValid() &&
      isEmailValid() &&
      isPhoneInputValid() &&
      isUserDepartValid() &&
      isUserIdValid() &&
      isUserNameValid()
    );
  };

  const handleContent = () => {
    const newEmail = `${state.email}@${state.selectedDomain}`; // 이메일

    const selectedDepart = departList.find(
      (it) => parseInt(it.depart_id) === parseInt(state.depart)
    ); // 선택된 부서

    const joinPhone = `010-${state.firstPhoneInput}-${state.secondPhoneInput}`; // 연락처

    const TempPw = `${state.firstPhoneInput}${state.secondPhoneInput}`;

    setContent({
      username: state.userId,
      password: TempPw,
      user_name: state.name,
      user_depart: selectedDepart.depart_descript,
      user_email: newEmail,
      user_phone: joinPhone,
      user_address: state.address,
      role: state.auth,
      user_joindate: state.date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleContent(); // content에 저장
  };

  // 비동기로 content가 업데이트 될 수 있는 시간을 벌어줌
  useEffect(() => {
    if (content.username !== '') {
      // content가 업데이트되었을 때만 onCreate 함수를 호출
      onCreate(content);
      navigate('/users/userList', { replace: true });
    }
  }, [content, onCreate, navigate]);

  return (
    <div className="UserReg">
      <section className="section">
        <div className="row">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">사용자 등록</h5>

                {/* form 블럭 시작 */}
                <form>
                  <div className="form-floating mb-3 col-sm-9 userId-wrapper">
                    <input
                      type="text"
                      className="form-control"
                      id="userId"
                      placeholder="입사일과 연락처를 입력하면 생성할 수 있습니다"
                      disabled
                      readOnly
                      value={state.userId}
                    />
                    <label htmlFor="userId">사원번호</label>
                    <div className="btn-wrapper">
                      <button
                        type="button"
                        className={['btn', 'disabled'].join(' ')}
                        ref={makeIdBtn}
                        onClick={updateUserId}
                      >
                        사원 번호 생성
                      </button>
                    </div>
                  </div>
                  <div className="form-floating mb-3 col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="이름"
                      name="name"
                      value={state.name}
                      ref={refs.userName}
                      onChange={handleChangeState}
                    />
                    <label htmlFor="inputName">이름</label>
                  </div>
                  <div className="form-floating mb-3 col-sm-6">
                    <select
                      className="form-select"
                      id="selectDepartment"
                      name="depart"
                      value={state.depart}
                      ref={refs.userDepart}
                      onChange={handleChangeState}
                    >
                      <option value={0}>부서 선택</option>
                      {getSortedDepartList().map((it) => (
                        <DepartItem key={it.depart_id} {...it} />
                      ))}
                    </select>
                    <label htmlFor="selectDepartment">부서</label>
                  </div>

                  <div className="form-floating mb-3 col-sm-6">
                    <input
                      type="date"
                      className="form-control"
                      id="joinDate"
                      name="date"
                      value={state.date}
                      ref={refs.joinDate}
                      onChange={handleChangeState}
                    />
                    <label htmlFor="joinDate">입사일</label>
                  </div>
                  <div className="form-floating mb-3 col-sm-6">
                    <select
                      className="form-select"
                      id="selectAuth"
                      name="auth"
                      value={state.auth}
                      ref={refs.userAuth}
                      onChange={handleChangeState}
                    >
                      <option value={'none'}>권한을 선택하세요</option>
                      <option value={'ROLE_USER'}>사원</option>
                      <option value={'ROLE_ADMIN'}>관리자</option>
                    </select>
                    <label htmlFor="selectAuth">권한</label>
                  </div>
                  <div className="col-9">
                    <label htmlFor="inputNanme4" className="form-label">
                      연락처
                    </label>

                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Username"
                        value="010"
                        readOnly
                        disabled
                      />
                      <span className="input-group-text">-</span>
                      <input
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                        }}
                        type="number"
                        className="first-phone form-control"
                        placeholder="XXXX"
                        maxLength={4} // 최대 4자리까지 입력
                        name="firstPhoneInput"
                        ref={refs.firstPhone}
                        value={state.firstPhoneInput}
                        onChange={handleChangeState}
                      />
                      <span className="input-group-text">-</span>
                      <input
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                        }}
                        type="number"
                        className="second-phone form-control"
                        placeholder="XXXX"
                        maxLength={4} // 최대 4자리까지 입력
                        name="secondPhoneInput"
                        ref={refs.secondPhone}
                        value={state.secondPhoneInput}
                        onChange={handleChangeState}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputNanme4" className="form-label">
                      이메일
                    </label>

                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="이메일"
                        ref={refs.userEmail}
                        name="email"
                        value={state.email}
                        onChange={handleChangeState}
                      />
                      <span className="input-group-text">@</span>
                      <select
                        className="form-select"
                        id="selectEmail"
                        ref={refs.userDomain}
                        name="selectedDomain"
                        value={state.selectedDomain}
                        onChange={handleChangeState}
                      >
                        <option value={'none'}>선택</option>
                        <option value={'gmail.com'}>gmail.com</option>
                        <option value={'naver.com'}>naver.com</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-floating mb-3 col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      id="userAddress"
                      placeholder="주소"
                      name="address"
                      value={state.address}
                      ref={refs.userAddr}
                      onChange={handleChangeState}
                    />
                    <label htmlFor="userAddress">주소</label>
                  </div>
                  <div className="userReg-btn-wrapper">
                    <button
                      type="submit"
                      className={`btn ${
                        validCheck() ? 'btn-primary' : 'btn-secondary disabled'
                      }`}
                      onClick={handleSubmit}
                    >
                      등록
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelClick}
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserReg;
