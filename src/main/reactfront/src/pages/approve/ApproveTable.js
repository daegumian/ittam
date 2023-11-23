import React from "react";

const ApproveTable = ({index, userq_num, username, userq_count, userq_kind, userq_regdate, userq_title, userq_comment, category_num, assets_num, func, funcClose,currentPage, itemsPerPage}) => {


    return (

        <tr className="prod-box">
            <th scope="row">
                {`${(currentPage - 1) * itemsPerPage + index + 1}`.padStart(4, '\u00A0')}
            </th>
            <td className="user_name">{username}</td>
            <td className="userq_KIND">{userq_kind}</td>
            <td className="userq_COUNT">{userq_count}</td>
            <td className="userq_REGDATE">{userq_regdate}</td>
            <th className="userq_TITLE" style={{display :"none"}}>{userq_title}</th>
            <th className="userq_COMMENT" style={{display :"none"}}>{userq_comment}</th>
            <th className="userq_NUM" style={{display :"none"}}>{userq_num}</th>
            <th className="category_NUM" style={{display :"none"}}>{category_num}</th>
            <th className="assets_num" style={{display :"none"}}>{assets_num}</th>

            <td>
                <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={func} id="approveBtn">승인</button>
            </td>
            <td>
                <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={funcClose}>반려</button>
            </td>
        </tr>


    )
}

export default ApproveTable;