import React, { useEffect, useState } from 'react';

function EmailAuthTime({ onTimeout, authBtn }) {
  const [timer, setTimer] = useState(180); // 초기 타이머 값 (3분을 초 단위로)

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer === 0) {
        // 타이머가 0이 되면 타임아웃 처리
        clearInterval(countdown);
        onTimeout(); // 타임아웃 콜백 호출
      } else {
        setTimer(timer - 1); // 타이머 값을 1초씩 감소
      }
    }, 1000); // 1초마다 실행

    return () => clearInterval(countdown); // 컴포넌트 언마운트 시 타이머 해제
  }, [timer, onTimeout]);

  return (
    <div>
      <p>남은 시간: {timer}초</p>
    </div>
  );
}

export default EmailAuthTime;
