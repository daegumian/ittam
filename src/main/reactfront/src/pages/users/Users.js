import React, { useContext, useEffect, useReducer, useRef } from "react";

import { useParams } from "react-router-dom";

// pages
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import UserList from "./UserList";
import UserReg from "./UserReg";
import UserLeave from "./UserLeave";
import PageTitle from "../../component/PageTitle";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

// 모든 컴포넌트에 보낼 Context
export const UserStateContext = React.createContext(); // 데이터
export const UserDispatchContext = React.createContext(); // 데이터 변환 함수

const Users = () => {
  const page = useParams().page;
  const subPage = useParams().subPage;

  const token = localStorage.getItem("token");
  const { userRole } = useContext(tokenInfoContext);

  const dataId = useRef(0);
  // 데이터 받아올 useReducer
  const [data, dispatch] = useReducer(reducer, []);

  // 데이터를 다시 불러와서 state를 업데이트하는 함수
  const getDataAndDispatch = async () => {
    dataId.current = 0; // 다시 불러올 때 dataId를 0으로 초기화

    try {
      const res = await axios({
        url: "/user/userList",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const mappedData = res.data.map((it) => {
        dataId.current += 1;
        return {
          id: dataId.current,
          ...it,
        };
      });
      dispatch({
        type: "INIT",
        data: mappedData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // 데이터 가져오는 부분
    const getData = async () => {
      try {
        const res = await axios({
          url: "/user/userList",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const mappedData = res.data.map((it) => {
          dataId.current += 1;
          return {
            id: dataId.current,
            ...it,
          };
        });
        dispatch({
          type: "INIT",
          data: mappedData,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData(); // 데이터 가져오기
  }, [token]); //

  // 새 유저 추가
  const onCreate = (content) => {
    axios
      .post("/user/userRegist", content, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          // 데이터 수정 후 다시 불러와서 업데이트
          getDataAndDispatch();
        } else {
          alert("등록에 실패하였습니다");
        }
      })
      .catch((err) => console.log(err));
  };

  // 유저 수정
  const onEdit = (targetId, role) => {
    axios({
      url: "/user/userEdit",
      method: "post",
      data: {
        targetId: targetId,
        role: role,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        // 데이터 수정 후 다시 불러와서 업데이트
        getDataAndDispatch();
        alert(res.data);
      })
      .catch((err) => alert(err.data));
  };

  // 유저 삭제
  const onRemove = (targetId) => {
    axios({
      url: "/user/userRemove",
      method: "post",
      data: {
        targetId: targetId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => {
      getDataAndDispatch();
      alert(res.data);
    });
  };

  // subPage 에 따라 랜더링할 컴포넌트 결정
  let subPageComponent;
  switch (subPage) {
    case "userList":
      subPageComponent = <UserList />;
      break;
    case "userReg":
      subPageComponent = <UserReg />;
      break;
    case "userLeave":
      subPageComponent = <UserLeave />;
      break;
    default:
      subPageComponent = null;
  }

  return (
    <UserStateContext.Provider value={data}>
      <UserDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <div className="Users">
          <main id="main" className="main">
            <PageTitle page={page} subPage={subPage} />
            {subPageComponent}
          </main>
        </div>
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

Users.defaultProps = {
  data: [],
};

export default Users;