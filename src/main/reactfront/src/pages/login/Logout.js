import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){


  const navigate = useNavigate();
  const logout = () => {
    navigate("/");  
    window.location.href = "/";
  }

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("로그아웃 되었습니다.");
    logout();  
  },[]);  
  
  return (
    <div>

    </div>
  )
}

export default Logout;