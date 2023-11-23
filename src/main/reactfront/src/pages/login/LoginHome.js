import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import EmailAuthTime from './EmailAuthTime';
import { useNavigate } from 'react-router-dom';
import base64 from 'base-64';
import { tokenInfoContext } from '../../component/TokenInfoProvider';
import { useCookies } from 'react-cookie';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';

function LoginHome({ hideHeaderAndSidebar }) {
  const { handleChange } = React.useContext(tokenInfoContext);

  // const {authResponse, setAuthResponse} = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordMismatch, setPasswordMismatch] = useState(false); // 비밀번호 변경 시 비밀번호 불일치 여부 저장
  const [emailAuthCompleted, setEmailAuthCompleted] = useState(false); // 이메일 인증 완려 여부
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 활성화 여부
  const [emailAuth, SetEmailAuth] = useState(''); // 이메일 인증
  const [cookies, setCookie] = useCookies(['userId']); // 쿠키
  const [rememberME, setRememberME] = useState(false); // 아이디 저장하기 유무
  const [inputPasswordModify, setInputPasswordModify] = useState("");
  const navigate = useNavigate();

  // 이메일 인증 타임아웃 처리
  const handleEmailAuthTimeout = () => {
    let yourPassword3 = document.getElementById('yourPassword3');

    setEmailAuthCompleted(true); // 이메일 인증 타임아웃 발생 시 처리할 로직
    setIsTimerActive(false); // 타이머 비활성화
    yourPassword3.disabled = true;
  };

  // 인증 버튼 클릭 시 타이머 시작
  const authBtn = (e) => {
    // 비밀번호 찾기 인증번호 요청
    let target = e.target;
    if (target.innerText === '인증번호 확인') {
      // 인증번호 확인 버튼
      target.setAttribute('data-bs-dismiss', 'modal');
      let authNum = document.getElementById('yourPassword3').value;
      console.log('입력한 인증번호 : ' + authNum);
      if (authNum == emailAuth) {
        alert('인증번호가 확인되었습니다.');
        let passwordReset = document.getElementById('passwordReset');
        let verticalycentered = document.getElementById('verticalycentered');
        passwordReset.classList.add('show');
        passwordReset.style.display = 'block';
        verticalycentered.classList.remove('show');
        verticalycentered.style.display = 'none';

        return;
      }
    }

    if (target.classList.contains('auth')) {
      // 이메일 입력 후 인증번호 요청 버튼 클릭
      let emailInput = document.getElementById('yourPassword2').value;

      axios({
        // 등록되어있는 이메일 여부 확인
        url: '/loginPage/passwordFind',
        method: 'post',
        data: {
          emailInput: emailInput,
        },
      })
        .then((response) => {
          // 조회
          if (response.data.length !== 0) {
            alert('인증번호가 발송되었습니다.');
            target.innerText = '인증번호 확인';
            target.classList.remove('auth');
            let open = document.getElementById('yourPassword3');
            open.disabled = ''; // 인증번호 비활성화 풀기

            axios({
              // 인증번호 전송 axios
              url: '/loginPage/authSend',
              method: 'post',
              data: {
                emailInput: emailInput,
              },
            })
              .then((response) => {
                // 인증번호 전송
                setIsTimerActive(true); // 타이머 활성화
                console.log('전달된 인증번호 : ' + response.data);
                SetEmailAuth(response.data);
                return;
              })
              .catch((error) => {
                // 등록되지 않은 이메일
                alert('인증번호 전송에 실패하였습니다.');
              });
          } else {
            alert('등록되지 않은 이메일입니다.');
          }
        })
        .catch((error) => {
          // 등록되지 않은 이메일
          alert('데이터 확인에 실패하였습니다.');
        });
    }
  };

  const passwordModify = (e) => {
    // 비밀번호 변경하기
    let passwordReset1 = document.getElementById('passwordReset1').value;
    let passwordReset2 = document.getElementById('passwordReset2').value;
    let emailInput = document.getElementById('yourPassword2').value;
    console.log(inputPasswordModify);
    if (inputPasswordModify.length < 8){
      alert('비밀번호는 최소 8글자 이상으로 입력해주세요.');
      return;
    }
    if (passwordReset1 === passwordReset2 && passwordReset1 !== '') {
      axios({
        // 인증번호 전송 axios
        url: '/loginPage/passwordModify',
        method: 'post',
        data: {
          passwordReset: passwordReset1,
          emailInput: emailInput,
        },
      })
        .then((response) => {
          // 인증번호 전송
          alert(response.data);
          closeBtn();
        })
        .catch((error) => {
          // 등록되지 않은 이메일
          alert('비밀번호 변경에 실패하였습니다.');
        });

      setPasswordMismatch(false); // 비밀번호가 일치하면 상태를 초기화
    } else {
      setPasswordMismatch(true); // 비밀번호가 일치하지 않으면 상태를 변경
    }
  };

  const closeBtn = () => {
    // 비밀번호 변경 창 닫기
    let passwordReset1 = document.getElementById('passwordReset1');
    let passwordReset2 = document.getElementById('passwordReset2');
    let passwordReset = document.getElementById('passwordReset');
    let modalBackdrop = document.querySelector('.modal-backdrop');
    let emailInput = document.getElementById('yourPassword2');
    let yourPassword3 = document.getElementById('yourPassword3');
    let authBtnContext = document.getElementById('authBtnContext');
    passwordReset.classList.remove('show');
    passwordReset.style.display = 'none';
    modalBackdrop.classList.remove('show');
    modalBackdrop.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.removeAttribute('style');

    passwordReset1.value = '';
    passwordReset2.value = '';
    emailInput.value = '';
    yourPassword3.value = '';
    yourPassword3.disabled = true;
    authBtnContext.innerText = '인증번호 받기';
    authBtnContext.classList.add('auth');
  };

  const login = async (e) => {
    // 로그인
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json(); // JSON으로 파싱

      if (response.status === 200) {
        const username = data.username; // username
        localStorage.setItem('username', username);
        const token = data.token; // 암호된 토큰
        let payload = token.substring(
          token.indexOf('.') + 1,
          token.lastIndexOf('.')
        ); // 토큰 진짜 가져오기
        localStorage.setItem('token', token);
        let dec = JSON.parse(base64.decode(payload));
        let role = dec.role;
        console.log(role);
        handleChange(username, role);

        if (rememberME) {
          console.log('리멤버미 : ' + rememberME);
          setCookie('userId', username); // 쿠키 저장
        }

        alert('반갑습니다.');
        //window.location.href = "/";
        if (role === 'ROLE_USER') {
          window.location.href = '/user/userMain';
        } else if (role === 'ROLE_ADMIN') {
          window.location.href = '/admin/adminMain';
        } else if (role === 'ROLE_HIGH_ADMIN') {
          window.location.href = 'highadmin/highAdminMain';
        }
      } 
    } catch (error) {
      alert('아이디 또는 비밀번호를 확인해주세요.');
      console.error('로그인 요청 중 오류 발생:', error);
    }
  };

  function deleteCookie(name) {
    document.cookie =
      name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  const handleOnChange = (e) => {
    setRememberME(e.target.checked);
    if (!e.target.checked) {
      console.log('쿠키삭제');
      deleteCookie('userId');
    }
  };

  useEffect(() => {
    if (cookies.userId !== undefined) {
      setUsername(cookies.userId);
      setRememberME(true);
    }
  }, [rememberME]);

  return (
    <>
      {!hideHeaderAndSidebar && <Header />}
      {!hideHeaderAndSidebar && <Sidebar />}
      <div>
        <main>
          <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-center py-4">
                      <a
                        href="index.html"
                        className="logo d-flex align-items-center w-auto"
                      >
                        <img src="assets/img/ittam2.png" alt=""></img>
                        <span className="d-none d-lg-block">Ittam</span>
                      </a>
                    </div>

                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                          <h5 className="card-title text-center pb-0 fs-4">
                            Ittam 로그인
                          </h5>
                          <p className="text-center small">
                            자산 시스템에 오신 것을 환영합니다.
                          </p>
                        </div>

                        <form
                          className="row g-3 needs-validation"
                          onSubmit={login}
                        >
                          <div className="col-12">
                            <label
                              htmlFor="yourUsername"
                              className="form-label"
                            >
                              사원번호
                            </label>
                            <div className="input-group has-validation">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend"
                              >
                                <BsFillPersonCheckFill />
                              </span>
                              <input
                                type="text"
                                name="username"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter your username.
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <label
                              htmlFor="yourPassword"
                              className="form-label"
                            >
                              비밀번호
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your password!
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="remember-me"
                                id="remember-me"
                                onChange={(e) => handleOnChange(e)}
                                checked={rememberME}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                                name=""
                              >
                                아이디 기억하기
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                              onClick={login}
                            >
                              Login
                            </button>
                          </div>
                          <div className="col-12">
                            <p className="small mb-0">
                              비밀번호를 잊어버리셨나요?
                              <button
                                type="button"
                                className="btn btn-primary passwordFind"
                                data-bs-toggle="modal"
                                data-bs-target="#verticalycentered"
                              >
                                비밀번호 찾기
                              </button>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* 비밀번호 찾기 모달창 */}
        <div
          className="modal fade"
          id="verticalycentered"
          tabIndex="-1"
          style={{ display: 'none' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">비밀번호 찾기</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body modal-box">
                <div className="col-12 ">
                  <label htmlFor="yourPassword" className="form-label">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="password"
                    className="form-control modal-input"
                    id="yourPassword2"
                    placeholder="이메일을 입력해주세요."
                    required
                  />
                </div>
                <div className="col-12 auth-box">
                  <label htmlFor="yourPassword" className="form-label">
                    인증번호
                  </label>
                  <input
                    type="text"
                    name="password"
                    className="form-control modal-input"
                    id="yourPassword3"
                    disabled
                  />
                </div>

                <div className="col-12 emailAuth">
                  {!emailAuthCompleted ? (
                    <div>
                      {/* 이메일 인증 타이머 컴포넌트 */}

                      {isTimerActive && (
                        <EmailAuthTime
                          onTimeout={handleEmailAuthTimeout}
                          authBtn={authBtn}
                        />
                      )}
                      <button
                        className="btn btn-primary w-100 auth"
                        type="submit"
                        onClick={authBtn}
                        id="authBtnContext"
                      >
                        인증번호 받기
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="btn btn-primary w-100 auth"
                        type="submit"
                        onClick={authBtn}
                        id="authBtnContext"
                      >
                        인증번호 받기
                      </button>
                      {/* 이메일 인증 완료 후 표시할 내용 */}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary modalClose"
                  data-bs-dismiss="modal"
                  onClick={handleEmailAuthTimeout}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 비밀번호 초기화 모달창 */}
        <div
          className="modal fade"
          id="passwordReset"
          tabIndex="-2"
          style={{ display: 'none' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">비밀번호 변경</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeBtn}
                ></button>
              </div>
              <div className="modal-body modal-box">
                <div className="col-12 ">
                  <label htmlFor="yourPassword" className="form-label">
                    새로운 비밀번호
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control modal-input"
                    id="passwordReset1"
                    placeholder="새로운 비밀번호를 입력해주세요."
                    value={inputPasswordModify}
                    onChange={(e) => setInputPasswordModify(e.target.value)}
                  />
                </div>
                <div className="col-12 auth-box">
                  <label htmlFor="yourPassword" className="form-label">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control modal-input"
                    placeholder="새로운 비밀번호를 다시 입력해주세요."
                    id="passwordReset2"
                  />
                  {passwordMismatch && (
                    <span style={{ color: 'red' }}>
                      비밀번호가 일치하지 않습니다.
                    </span>
                  )}
                </div>

                <div className="col-12 emailAuth">
                  <button
                    className="btn btn-primary w-100 auth"
                    type="submit"
                    onClick={passwordModify}
                  >
                    비밀번호 번경
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary modalClose"
                  data-bs-dismiss="modal"
                  onClick={closeBtn}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginHome;
