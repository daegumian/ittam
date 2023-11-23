import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { tokenInfoContext } from "./TokenInfoProvider";

const PageTitle = ({ page, subPage }) => {
    const { userRole } = useContext(tokenInfoContext);

    // 현재 Page 의 주소를 useParams 로 받는다
    const { page: currentPage, subPage: currentSubPage } = useParams();

    let title;
    switch (subPage) {
        case "userList":
            title = "사용자 목록";
            break;
        case "userReg":
            title = "사용자 등록";
            break;
        case "userLeave":
            title = "퇴사 신청 목록";
            break;
        case "userAuth":
            title = "사용자 권한 관리";
            break;
        default:
            title = "";
    }

    let homeLink;
    switch (userRole) {
        case "ROLE_ADMIN":
            homeLink = "/admin/adminMain";
            break;
        case "ROLE_HIGH_ADMIN":
            homeLink = "/highadmin/highAdminMain";
            break;
        default:
            homeLink = "/user/userMain";
    }
    return (
        <div className="pagetitle">
            <h1>{title}</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={homeLink}>Home</Link>
                    </li>
                    <li className="breadcrumb-item">{currentPage}</li>
                    <li className="breadcrumb-item active">
                        {/* 이동 주소를 현재로 설정 */}
                        <Link to={`/${currentPage}/${currentSubPage}`}>
                            {currentSubPage}
                        </Link>
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default PageTitle;