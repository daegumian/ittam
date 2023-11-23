import axios from "axios";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";

const handleExcelDownload = (page, token) => {
  axios({
    url: "/excelDownload/excelDownload.do",
    method: "get",
    params: { page }, // page 전달
    responseType: "blob", // byte형태로 반환을 받음
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", page + ".xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((err) => {
      console.log(err);
    });
};

const ExcelDownload = ({ page }) => {
  const token = localStorage.getItem("token");

  return (
    <BsFillFileEarmarkExcelFill
      className="excel-down"
      title="엑셀 다운로드"
      onClick={() => handleExcelDownload(page, token)}
    />
  );
};

export default ExcelDownload;
